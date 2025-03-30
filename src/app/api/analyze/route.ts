import { NextResponse } from "next/server";
import OpenAI from "openai";
import { appendToSheet } from "@/utils/googleSheets";
import { searchGitHub } from "@/utils/githubSearch";
import { getProductHuntPosts } from "@/utils/productHunt";
import * as fs from "fs";

// --- Configuration & Clients ---
export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Perplexity client for chat completions (for product idea analysis)
const perplexityClient = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

// Hugging Face Inference API settings for embeddings
// Using the pipeline endpoint which expects: { "inputs": [ "sentence 1", "sentence 2", ... ] }
const HF_API_URL =
  "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";
const HF_API_TOKEN = process.env.HF_API_KEY as string;

const systemPrompt = `You are an investment research assistant. Analyze the provided problem or product idea and return a JSON response.
IMPORTANT: Your response must be ONLY valid JSON with NO markdown, NO code blocks, and NO additional text. If it contains source details in its title/name then you must have the same in your response structure startup name.

For startups/products:
- Only include companies/products that are actively operating in the market and are less than 10 years old valued at less than 1 billion USD
- For the URL field, you must:
  * Include ONLY the official website URL of the company/product
  * Ensure it's the company's main domain (e.g., "https://company.com")
  * Do NOT include URLs to news articles, press releases, or third-party websites
  * If you cannot find or verify the official URL, use an empty string ""
- Include only relevant startups/products
- If there are no relevant startups/products, return an empty array

The response must exactly match this structure:
{
  "result": {
    "problem_statement": "string describing the problem being solved",
    "market_analysis": {
      "overview": "string summarizing market analysis",
      "startups": [
        {
          "name": "string (source name if from product hunt)",
          "description": "string",
          "features": ["string"],
          "funding_stage": "string (e.g., 'Seed', 'Series A', 'Series B', etc.)",
          "url": "string with ONLY the official company website URL or empty string"
        }
      ]
    },
    "investment_opportunity": {
      "growth_potential": "string describing growth potential"
    },
    "conclusion": {
      "investment_summary": "string",
    }
  }
}
  
Remember: Return ONLY the JSON. No text before or after. No markdown formatting.`;

// --- Helper Functions for Hugging Face Embeddings ---

const BATCH_SIZE = 100;
const MAX_DESCRIPTION_LENGTH = 150;

// Format a company object into a complete sentence.
function companyEmbeddingText(company: any): string {
  const desc = company.long_description ? company.long_description.substring(0, MAX_DESCRIPTION_LENGTH).trim() : "";
  return `${company.name}. ${desc}. Industry: ${company.industry}. Stage: ${company.stage}.`;
}

// Batch-call the Hugging Face API for an array of texts.
async function fetchEmbeddingsBatch(texts: string[]): Promise<number[][]> {
  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: texts })
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Hugging Face API error: ${response.status} ${response.statusText}: ${errText}`);
  }
  const result = await response.json();
  if (!Array.isArray(result)) {
    throw new Error("Unexpected embedding response format");
  }
  return result as number[][];
}

// Cosine similarity between two vectors.
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] ** 2;
    normB += vecB[i] ** 2;
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// --- Caching Company Embeddings ---
let cachedCompanyEmbeddings: { company: any; embedding: number[] }[] | null = null;

async function createEmbeddingsForCompanies() {
  if (cachedCompanyEmbeddings) return cachedCompanyEmbeddings;
  const companies = JSON.parse(fs.readFileSync("output.json", "utf8"));
  const texts = companies.map((company: any) => companyEmbeddingText(company));
  const companyEmbeddings: { company: any; embedding: number[] }[] = [];
  
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batchTexts = texts.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} / ${Math.ceil(texts.length / BATCH_SIZE)}`);
    const batchEmbeddings = await fetchEmbeddingsBatch(batchTexts);
    for (let j = 0; j < batchEmbeddings.length; j++) {
      companyEmbeddings.push({
        company: companies[i + j],
        embedding: batchEmbeddings[j],
      });
    }
  }
  cachedCompanyEmbeddings = companyEmbeddings;
  return companyEmbeddings;
}

// Compute similarity scores for a given prompt.
async function similaritySearch(prompt: string, companyEmbeddings: { company: any; embedding: number[] }[]) {
  const promptEmbeddings = await fetchEmbeddingsBatch([prompt]);
  const promptEmbedding = promptEmbeddings[0];
  const similarities = companyEmbeddings.map((item) => {
    const sim = cosineSimilarity(promptEmbedding, item.embedding);
    return { company: item.company, similarity: sim };
  });
  similarities.sort((a, b) => b.similarity - a.similarity);
  return similarities;
}

// --- Main POST Endpoint ---
export async function POST(request: Request) {
  const responseHeaders: Record<string, string> = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  try {
    if (!process.env.PERPLEXITY_API_KEY || !process.env.HF_API_KEY) {
      throw new Error("Required API keys are not configured");
    }
    const body = await request.json();
    const { productIdea, similarityPrompt } = body;
    if (!productIdea) {
      return NextResponse.json({ error: "Product idea is required" }, { status: 400 });
    }
    
    console.log("Analyzing product idea:", productIdea);
    
    // 1. Run GitHub search first.
    const githubResults = await searchGitHub(productIdea);
    console.log("GitHub results obtained.");

    // 2. Then fetch Product Hunt posts.
    const productHuntPosts = await getProductHuntPosts();
    console.log("Fetched Product Hunt Posts:", productHuntPosts);

    // 3. Determine if we perform similarity search.
    // We trigger if an explicit similarityPrompt is provided,
    // or if the product idea is short (<=10 words).
    const searchText =
      similarityPrompt ||
      (typeof productIdea === "string" && productIdea.trim().split(/\s+/).length <= 10
        ? productIdea.trim()
        : null);

    let similarityResults = null;
    if (searchText) {
      console.log("Performing similarity search for prompt:", searchText);
      try {
        const companyEmbeddings = await createEmbeddingsForCompanies();
        const simResults = await similaritySearch(searchText, companyEmbeddings);
        similarityResults = simResults.slice(0, 5).map(({ company, similarity }) => ({
          name: company.name,
          industry: company.industry,
          stage: company.stage,
          website: company.website,
          similarity: similarity.toFixed(4),
        }));
      } catch (err: any) {
        console.error("Error during similarity search:", err);
        // Continue even if similarity search fails.
        similarityResults = { error: err instanceof Error ? err.message : "Unknown error" };
      }
    }

    // 4. Finally, perform the Perplexity chat completion for overall analysis.
    const perplexityResponse = await perplexityClient.chat.completions.create({
      model: "llama-3.1-sonar-large-128k-online",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: productIdea + ` Here are some recent Product Hunt posts that could be relevant: ${JSON.stringify(productHuntPosts)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    if (!perplexityResponse.choices?.[0]?.message?.content) {
      throw new Error("No response content from API");
    }
    const rawContent = perplexityResponse.choices[0].message.content;
    console.log("Raw API Response:", rawContent);
    let cleanContent = rawContent.trim();
    if (cleanContent.startsWith("```") && cleanContent.endsWith("```")) {
      cleanContent = cleanContent.slice(3, -3).trim();
    }
    if (cleanContent.startsWith("json")) {
      cleanContent = cleanContent.slice(4).trim();
    }
    console.log("Cleaned content for parsing:", cleanContent);

    let analysisResult;
    try {
      analysisResult = JSON.parse(cleanContent);
      console.log("Successfully parsed JSON:", analysisResult);
      if (!analysisResult || !analysisResult.result) {
        throw new Error("Invalid JSON structure: missing result object");
      }
    } catch (parseError: any) {
      console.error("JSON Parse Error:", parseError);
      return NextResponse.json(
        {
          error: "Failed to parse API response as JSON",
          details: parseError instanceof Error ? parseError.message : "Unknown parsing error",
          content: cleanContent,
          rawContent,
        },
        { status: 422, headers: responseHeaders }
      );
    }
    
    // Append to sheet.
    const sheetResult = await appendToSheet({
      productIdea,
      analysisResult: analysisResult.result,
      timestamp: new Date().toISOString(),
    });
    console.log("Sheet update result:", sheetResult);

    return NextResponse.json({
      content: cleanContent,
      githubResults,
      productHuntPosts,
      similarityResults,
      sheetUpdated: sheetResult,
    }, { headers: responseHeaders });
    
  } catch (error: any) {
    console.error("Request Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400, headers: responseHeaders }
    );
  }
}
