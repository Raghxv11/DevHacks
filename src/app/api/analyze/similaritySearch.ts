// src/app/api/analyze/similaritySearch.ts
import { NextResponse } from "next/server";
import * as fs from "fs";
import { createInterface } from "readline";

// Use require instead of import to avoid TS checking private identifiers.
const OpenAI = require("openai").default;

// Change runtime to nodejs
export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Create a new OpenAI client
const client = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

// Load companies from output.json (adjust the path if necessary)
const companies = JSON.parse(fs.readFileSync("./output.json", "utf8"));

// Helper function to combine company information into a single text.
function companyText(company: any): string {
  return `${company.name}. ${company.long_description}. Industry: ${company.industry}. Stage: ${company.stage}.`;
}

// Precompute embeddings for companies. In production, consider caching these.
async function createEmbeddingsForCompanies() {
  const companyEmbeddings = await Promise.all(
    companies.map(async (company: any) => {
      const text = companyText(company);
      const embeddingResponse = await client.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
      });
      const embedding = embeddingResponse.data[0].embedding;
      return { ...company, embedding };
    })
  );
  return companyEmbeddings;
}

// Cosine similarity computation
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] ** 2;
    magB += vecB[i] ** 2;
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// Perform similarity search given a prompt and company embeddings.
async function similaritySearch(prompt: string, companyEmbeddings: any[]) {
  const promptEmbeddingResponse = await client.embeddings.create({
    model: "text-embedding-ada-002",
    input: prompt,
  });
  const promptEmbedding = promptEmbeddingResponse.data[0].embedding;

  const similarities = companyEmbeddings.map(company => {
    const sim = cosineSimilarity(promptEmbedding, company.embedding);
    return { company, similarity: sim };
  });

  similarities.sort((a, b) => b.similarity - a.similarity);
  return similarities;
}

// POST endpoint integration.
export async function POST(request: Request) {
  const responseHeaders: Record<string, string> = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  try {
    if (!process.env.PERPLEXITY_API_KEY) {
      throw new Error("PERPLEXITY_API_KEY is not configured");
    }
    const body = await request.json();

    // If a similarity prompt is provided, perform the similarity search.
    if (body.similarityPrompt) {
      console.log("Performing similarity search for prompt:", body.similarityPrompt);
      const companyEmbeddings = await createEmbeddingsForCompanies();
      const results = await similaritySearch(body.similarityPrompt, companyEmbeddings);
      // Return top 5 matches.
      const topMatches = results.slice(0, 5).map(({ company, similarity }) => ({
        name: company.name,
        industry: company.industry,
        stage: company.stage,
        similarity: similarity.toFixed(4),
        website: company.website,
      }));
      return NextResponse.json({ results: topMatches }, { headers: responseHeaders });
    }

    // Otherwise, continue with your existing logic (e.g. product idea analysis).
    const { productIdea } = body;
    if (!productIdea) {
      return NextResponse.json({ error: "Product idea is required" }, { status: 400 });
    }
    // ... (rest of your existing code)
  } catch (error) {
    console.error("Request Error:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 400, headers: responseHeaders }
    );
  }
}
