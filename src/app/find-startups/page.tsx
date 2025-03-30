"use client";

import Input from "@/components/Input";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

interface GitHubResult {
  name: string;
  url: string;
  description: string;
  stars: number;
  language: string;
}

interface ChatResponse {
  content: string;
  citations?: string[];
  sheetUpdated?: boolean;
  error?: string;
  githubResults?: GitHubResult[];
}

interface Startup {
  name: string;
  description: string;
  features: string[];
  funding_stage: string;
  url: string;
}

interface InputProps {
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  value: string;
  error?: boolean;
  placeholder?: string;
}

const Chatbot: React.FC = () => {
  const [productIdea, setProductIdea] = useState("");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedStartups, setExpandedStartups] = useState<Set<number>>(
    new Set()
  );
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [inputError, setInputError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Platform to manage all your subscriptions",
    "AI-powered productivity tools",
    "Remote work collaboration tools",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous errors
    setInputError(null);

    // Check for empty input
    if (!productIdea.trim()) {
      setInputError("Please enter your product idea");
      return;
    }

    setIsLoading(true);
    setLoadingProgress(0);

    // Improved progress simulation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 85) {
          return 85; // Cap at 85% until actual completion
        }
        return prev + (90 - prev) * 0.1; // Smoother progression
      });
    }, 100);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        body: JSON.stringify({ productIdea }),
        cache: "no-store",
      });

      // Clear previous response before setting new one
      setResponse(null);

      const data = await res.json();
      console.log("Raw API Response:", data);
      console.log("Raw content:", data.content);
      console.log("Sheet updated:", data.sheetUpdated);

      if (data.error) {
        console.error("Error from API:", data.error);
        throw new Error(data.error);
      }

      const formattedContent = formatAnalysisContent(data.content);
      setResponse({
        ...data,
        content: formattedContent,
      });

      setLoadingProgress(100);

      // Scroll to results after a brief delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error analyzing product idea:", error);
      setResponse({
        content: `
          <div class="space-y-6">
            <div class="bg-investa-primary/10 border border-investa-primary/20 rounded-xl p-6 backdrop-blur-sm">
              <div class="flex items-center gap-3 text-investa-primary">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 class="font-semibold">Uh-oh! We hit a snag</h3>
              </div>
              <p class="mt-3 text-investa-gray">We're having some trouble analyzing your idea right now. Our team has been notified and we're working on it. Please try again in a few moments.</p>
              <div class="mt-4 flex gap-4">
                <button 
                  onclick="window.location.reload()"
                  class="text-sm px-4 py-2 rounded-lg bg-investa-primary/20 text-investa-primary hover:bg-investa-primary/30 transition-colors"
                >
                  Try Again
                </button>
                <a 
                  href="/"
                  class="text-sm px-4 py-2 rounded-lg bg-investa-gray/20 text-investa-gray hover:bg-investa-gray/30 transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          </div>
        `,
        sheetUpdated: false,
      });
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } finally {
      clearInterval(progressInterval);
    }
  };

  const formatAnalysisContent = (content: string) => {
    try {
      console.log("Original content:", content);
      let cleanJson = content;

      if (content.includes("```")) {
        cleanJson = content.replace(/^```(?:json)?\n|\n```$/g, "").trim();
      }

      console.log("Cleaned JSON:", cleanJson);

      let analysisData;
      try {
        analysisData = JSON.parse(cleanJson);
        analysisData = analysisData.result ? analysisData.result : analysisData;
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.log("Failed JSON string:", cleanJson);
        return `
          <div class="bg-investa-primary/10 border border-investa-primary/20 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
            <h3 class="text-investa-primary font-semibold mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Error Parsing Response
            </h3>
            <pre class="text-sm text-investa-gray whitespace-pre-wrap bg-white/70 p-5 rounded-xl">${content}</pre>
          </div>
        `;
      }

      const formattedContent = `
        <div class="space-y-10">
          <!-- Problem Statement -->
          <section class="transform hover:scale-[1.02] transition-all duration-500">
            <div class="bg-gradient-to-r from-blue-400/30 via-investa-primary/20 to-purple-400/30 rounded-2xl p-[2px] shadow-lg">
              <div class="bg-white/95 shadow-xl backdrop-blur-xl rounded-2xl p-10 border border-investa-primary/10">
                <div class="flex items-start gap-4 mb-6">
                  <div class="w-12 h-12 rounded-full bg-investa-primary/15 flex items-center justify-center text-investa-primary flex-shrink-0 mt-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-investa-primary mb-3">
                      Problem Statement
                    </h2>
                    <div class="text-investa-gray leading-relaxed pl-3 border-l-3 border-investa-primary/20 text-lg">
                      ${analysisData.problem_statement}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Active Startups -->
          <section class="transform hover:scale-[1.02] transition-all duration-500">
            <div class="bg-gradient-to-r from-blue-400/30 via-investa-primary/20 to-purple-400/30 rounded-2xl p-[2px] shadow-lg">
              <div class="bg-white/95 shadow-xl backdrop-blur-xl rounded-2xl p-10 border border-investa-primary/10">
                <div class="flex items-start gap-4 mb-8">
                  <div class="w-12 h-12 rounded-full bg-investa-primary/15 flex items-center justify-center text-investa-primary flex-shrink-0 mt-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-investa-primary">
                    Active Startups
                  </h2>
                </div>
                <div class="space-y-6">
                  ${
                    analysisData.market_analysis.startups.length === 0
                      ? `
                      <div class="bg-gray-50 rounded-xl border border-gray-100 p-6 flex items-center gap-4">
                        <div class="bg-gray-100/80 rounded-full p-3">
                          <svg class="w-6 h-6 text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 class="font-medium text-investa-dark">No Startups Found</h4>
                          <p class="text-sm text-investa-gray">No active startups found in this space.</p>
                        </div>
                      </div>
                    `
                      : analysisData.market_analysis.startups
                          .map(
                            (startup: Startup, index: number) => `
                          <div class="bg-white rounded-xl border border-investa-primary/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300" data-startup-index="${index}">
                            <button class="w-full p-6 text-left flex items-center justify-between cursor-pointer hover:bg-investa-primary/5 transition-colors" 
                                    onclick="document.dispatchEvent(new CustomEvent('toggleStartup', { detail: ${index} }))">
                              <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-investa-primary/20 to-investa-primary/10 flex items-center justify-center text-investa-primary font-bold text-lg shadow-sm">
                                  ${startup.name.charAt(0)}${startup.name.split(' ')[1]?.charAt(0) || ''}
                                </div>
                                <h4 class="font-semibold text-lg text-investa-dark">${
                                  startup.name
                                }</h4>
                              </div>
                              <div class="flex items-center gap-4">
                                <span class="text-xs px-4 py-2 bg-investa-primary/10 text-investa-primary rounded-full font-medium">
                                  ${startup.funding_stage}
                                </span>
                                <div class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                                  <svg class="w-5 h-5 transition-transform duration-300 startup-arrow text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </button>
                            <div class="startup-content hidden border-t border-investa-primary/10 bg-gradient-to-b from-white to-gray-50/30">
                              <div class="p-8 space-y-6">
                                <div>
                                  <p class="text-sm text-investa-primary mb-3 font-semibold flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Description
                                  </p>
                                  <p class="text-investa-gray bg-white p-5 rounded-lg border border-gray-100 leading-relaxed">${
                                    startup.description
                                  }</p>
                                </div>
                                <div>
                                  <p class="text-sm text-investa-primary mb-3 font-semibold flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    Key Features
                                  </p>
                                  <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    ${startup.features
                                      .map(
                                        (feature) => `
                                      <li class="flex items-center gap-3 text-investa-gray bg-white px-5 py-4 rounded-lg border border-gray-100 hover:border-investa-primary/20 hover:shadow-sm transition-all">
                                        <div class="w-7 h-7 rounded-full bg-investa-primary/10 flex items-center justify-center flex-shrink-0">
                                          <svg class="w-4 h-4 text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                          </svg>
                                        </div>
                                        <span class="text-sm md:text-base">${feature}</span>
                                      </li>
                                    `
                                      )
                                      .join("")}
                                  </ul>
                                </div>
                                ${
                                  startup.url
                                    ? `
                                  <div class="border-t border-gray-100 pt-5">
                                    <p class="text-sm text-investa-primary font-semibold mb-3 flex items-center gap-2">
                                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                      </svg>
                                      Website
                                    </p>
                                    <a href="${startup.url}" 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       class="flex items-center gap-2 text-investa-primary hover:text-investa-primary/80 transition-colors p-4 bg-white rounded-lg border border-gray-100 hover:border-investa-primary/20 hover:shadow-md">
                                      <span class="text-sm truncate">${startup.url}</span>
                                      <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  </div>
                                `
                                    : ""
                                }
                              </div>
                            </div>
                          </div>
                        `
                          )
                          .join("")
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      `;

      return formattedContent;
    } catch (error) {
      console.error("Error formatting content:", error);
      return `<div class="prose prose-invert">${content}</div>`;
    }
  };

  // Add event listener for startup toggles
  React.useEffect(() => {
    const handleToggle = (event: CustomEvent<number>) => {
      toggleStartup(event.detail);
    };

    document.addEventListener(
      "toggleStartup",
      handleToggle as EventListener
    );
    return () => {
      document.removeEventListener(
        "toggleStartup",
        handleToggle as EventListener
      );
    };
  }, []);

  // Update startup visibility when expandedStartups changes
  React.useEffect(() => {
    if (!response) return;

    document.querySelectorAll("[data-startup-index]").forEach((el) => {
      const index = parseInt(el.getAttribute("data-startup-index") || "0");
      const content = el.querySelector(".startup-content");
      const arrow = el.querySelector(".startup-arrow");

      if (expandedStartups.has(index)) {
        content?.classList.remove("hidden");
        arrow?.classList.add("rotate-180");
      } else {
        content?.classList.add("hidden");
        arrow?.classList.remove("rotate-180");
      }
    });
  }, [expandedStartups, response]);

  const toggleStartup = (index: number) => {
    setExpandedStartups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Add this function to handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setProductIdea(suggestion);
    // Automatically submit the form after selecting a suggestion
    setTimeout(() => {
      // Check for empty input to avoid submitting with empty state
      if (suggestion.trim()) {
        setInputError(null);
        setIsLoading(true);
        setLoadingProgress(0);
        
        // Improved progress simulation
        const progressInterval = setInterval(() => {
          setLoadingProgress((prev) => {
            if (prev >= 85) {
              return 85; // Cap at 85% until actual completion
            }
            return prev + (90 - prev) * 0.1; // Smoother progression
          });
        }, 100);
        
        fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
          body: JSON.stringify({ productIdea: suggestion }),
          cache: "no-store",
        })
        .then(async (res) => {
          // Clear previous response before setting new one
          setResponse(null);
          
          const data = await res.json();
          console.log("Raw API Response:", data);
          console.log("Raw content:", data.content);
          console.log("Sheet updated:", data.sheetUpdated);
          
          if (data.error) {
            console.error("Error from API:", data.error);
            throw new Error(data.error);
          }
          
          const formattedContent = formatAnalysisContent(data.content);
          setResponse({
            ...data,
            content: formattedContent,
          });
          
          setLoadingProgress(100);
          
          // Scroll to results after a brief delay
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            setIsLoading(false);
          }, 500);
        })
        .catch((error) => {
          console.error("Error analyzing product idea:", error);
          setResponse({
            content: `
              <div class="space-y-6">
                <div class="bg-investa-primary/10 border border-investa-primary/20 rounded-xl p-6 backdrop-blur-sm">
                  <div class="flex items-center gap-3 text-investa-primary">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 class="font-semibold">Uh-oh! We hit a snag</h3>
                  </div>
                  <p class="mt-3 text-investa-gray">We're having some trouble analyzing your idea right now. Our team has been notified and we're working on it. Please try again in a few moments.</p>
                  <div class="mt-4 flex gap-4">
                    <button 
                      onclick="window.location.reload()"
                      class="text-sm px-4 py-2 rounded-lg bg-investa-primary/20 text-investa-primary hover:bg-investa-primary/30 transition-colors"
                    >
                      Try Again
                    </button>
                    <a 
                      href="/"
                      class="text-sm px-4 py-2 rounded-lg bg-investa-gray/20 text-investa-gray hover:bg-investa-gray/30 transition-colors"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              </div>
            `,
            sheetUpdated: false,
          });
          setLoadingProgress(100);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        })
        .finally(() => {
          clearInterval(progressInterval);
        });
      }
    }, 100); // Small delay to ensure state updates properly
  };

  // Add cleanup when component unmounts
  React.useEffect(() => {
    return () => {
      setResponse(null);
      setProductIdea("");
      setIsLoading(false);
      setLoadingProgress(0);
      setInputError(null);
      setExpandedStartups(new Set());
    };
  }, []);

  // Add cleanup when productIdea changes
  React.useEffect(() => {
    setResponse(null);
  }, [productIdea]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, #53505008 1px, transparent 1px), 
                          linear-gradient(to bottom, #53505008 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative z-10 px-4 pt-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header with Back to Home Button */}
          <div className="flex justify-between items-center mb-12">
            <Link href="/">
              <div className="font-bold text-3xl text-investa-primary transition-all hover:scale-105">Renvue</div>
            </Link>
            <Link href="/">
              <button className="h-10 px-8 bg-investa-dark text-white rounded-full hover:bg-opacity-90 transition-all font-medium text-sm flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "4px" }}
                >
                  <path 
                    d="M3 12h18M3 12l6-6M3 12l6 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Home
              </button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-investa-dark leading-tight mb-6">
              Find Promising Startups
            </h1>
            <p className="text-investa-gray text-lg max-w-3xl mx-auto">
              Discover high-potential startups that match your investment criteria and industry focus.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 max-w-3xl mx-auto mb-12"
          >
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={productIdea}
                  onChange={(e) => {
                    setProductIdea(e.target.value);
                    setInputError(null);
                  }}
                  placeholder="Describe the investment opportunity or sector you're looking for..."
                  className="w-full h-14 px-5 bg-white rounded-full border-2 border-investa-primary/30 focus:border-investa-primary text-investa-dark text-lg focus:outline-none shadow-lg focus:shadow-investa-primary/20 transition-all"
                />
                {!isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <button
                      type="submit"
                      className="h-10 px-6 bg-investa-primary text-white rounded-full hover:bg-opacity-90 font-medium text-sm flex items-center justify-center shadow-sm"
                    >
                      Search
                    </button>
                  </div>
                )}
              </div>
              {inputError && (
                <div className="absolute -bottom-6 left-0 w-full text-center">
                  <span className="text-investa-primary text-sm">{inputError}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-5 py-2.5 rounded-full text-sm bg-white border border-investa-gray/30 text-investa-gray hover:text-investa-primary hover:border-investa-primary/30 transition-all transform hover:scale-105 active:scale-95 duration-200 shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {isLoading && (
              <div className="text-center">
                <div className="relative h-2 w-full max-w-md mx-auto bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-investa-primary rounded-full"
                    style={{
                      width: `${loadingProgress}%`,
                      transition: "width 0.5s ease-out",
                    }}
                  />
                </div>
                <p className="mt-3 text-investa-gray">Researching startup opportunities...</p>
              </div>
            )}
          </form>

          {response && (
            <div
              ref={resultsRef}
              className="animate-fadeIn"
            >
              <div className="relative max-w-4xl mx-auto">
                <div dangerouslySetInnerHTML={{ __html: response.content }} />
                {response.citations && (
                  <div className="mt-10 border-t border-gray-200 pt-8">
                    <h3 className="text-xl font-semibold text-investa-primary mb-6">
                      Sources
                    </h3>
                    <ul className="space-y-3">
                      {response.citations.map((citation, index) => (
                        <li key={index} className="flex gap-4 text-investa-gray">
                          <span className="text-investa-primary text-xl">•</span>
                          {citation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
