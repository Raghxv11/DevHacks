"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = exports.maxDuration = exports.runtime = void 0;
exports.POST = POST;
// src/app/api/analyze/similaritySearch.ts
var server_1 = require("next/server");
var fs = require("fs");
// Use require instead of import to avoid TS checking private identifiers.
var OpenAI = require("openai").default;
// Change runtime to nodejs
exports.runtime = 'nodejs';
exports.maxDuration = 60;
exports.dynamic = 'force-dynamic';
// Create a new OpenAI client
var client = new OpenAI({
    apiKey: process.env.PERPLEXITY_API_KEY,
    baseURL: "https://api.perplexity.ai",
});
// Load companies from output.json (adjust the path if necessary)
var companies = JSON.parse(fs.readFileSync("./output.json", "utf8"));
// Helper function to combine company information into a single text.
function companyText(company) {
    return "".concat(company.name, ". ").concat(company.long_description, ". Industry: ").concat(company.industry, ". Stage: ").concat(company.stage, ".");
}
// Precompute embeddings for companies. In production, consider caching these.
function createEmbeddingsForCompanies() {
    return __awaiter(this, void 0, void 0, function () {
        var companyEmbeddings;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(companies.map(function (company) { return __awaiter(_this, void 0, void 0, function () {
                        var text, embeddingResponse, embedding;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    text = companyText(company);
                                    return [4 /*yield*/, client.embeddings.create({
                                            model: "text-embedding-ada-002",
                                            input: text,
                                        })];
                                case 1:
                                    embeddingResponse = _a.sent();
                                    embedding = embeddingResponse.data[0].embedding;
                                    return [2 /*return*/, __assign(__assign({}, company), { embedding: embedding })];
                            }
                        });
                    }); }))];
                case 1:
                    companyEmbeddings = _a.sent();
                    return [2 /*return*/, companyEmbeddings];
            }
        });
    });
}
// Cosine similarity computation
function cosineSimilarity(vecA, vecB) {
    var dot = 0, magA = 0, magB = 0;
    for (var i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        magA += Math.pow(vecA[i], 2);
        magB += Math.pow(vecB[i], 2);
    }
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
// Perform similarity search given a prompt and company embeddings.
function similaritySearch(prompt, companyEmbeddings) {
    return __awaiter(this, void 0, void 0, function () {
        var promptEmbeddingResponse, promptEmbedding, similarities;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.embeddings.create({
                        model: "text-embedding-ada-002",
                        input: prompt,
                    })];
                case 1:
                    promptEmbeddingResponse = _a.sent();
                    promptEmbedding = promptEmbeddingResponse.data[0].embedding;
                    similarities = companyEmbeddings.map(function (company) {
                        var sim = cosineSimilarity(promptEmbedding, company.embedding);
                        return { company: company, similarity: sim };
                    });
                    similarities.sort(function (a, b) { return b.similarity - a.similarity; });
                    return [2 /*return*/, similarities];
            }
        });
    });
}
// POST endpoint integration.
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var responseHeaders, body, companyEmbeddings, results, topMatches, productIdea, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    responseHeaders = {
                        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!process.env.PERPLEXITY_API_KEY) {
                        throw new Error("PERPLEXITY_API_KEY is not configured");
                    }
                    return [4 /*yield*/, request.json()];
                case 2:
                    body = _a.sent();
                    if (!body.similarityPrompt) return [3 /*break*/, 5];
                    console.log("Performing similarity search for prompt:", body.similarityPrompt);
                    return [4 /*yield*/, createEmbeddingsForCompanies()];
                case 3:
                    companyEmbeddings = _a.sent();
                    return [4 /*yield*/, similaritySearch(body.similarityPrompt, companyEmbeddings)];
                case 4:
                    results = _a.sent();
                    topMatches = results.slice(0, 5).map(function (_a) {
                        var company = _a.company, similarity = _a.similarity;
                        return ({
                            name: company.name,
                            industry: company.industry,
                            stage: company.stage,
                            similarity: similarity.toFixed(4),
                            website: company.website,
                        });
                    });
                    return [2 /*return*/, server_1.NextResponse.json({ results: topMatches }, { headers: responseHeaders })];
                case 5:
                    productIdea = body.productIdea;
                    if (!productIdea) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Product idea is required" }, { status: 400 })];
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Request Error:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Failed to process request", details: error_1 instanceof Error ? error_1.message : "Unknown error" }, { status: 400, headers: responseHeaders })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
