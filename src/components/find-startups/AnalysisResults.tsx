import React, { useState, useEffect, useRef } from "react";
import { ChatResponse } from "./types";
import Citations from "./Citations";

interface AnalysisResultsProps {
  response: ChatResponse;
  onNewSearch: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  response,
  onNewSearch,
}) => {
  const [expandedStartups, setExpandedStartups] = useState<Set<number>>(
    new Set()
  );
  const resultsRef = useRef<HTMLDivElement>(null);

  // Scroll to results when response changes
  useEffect(() => {
    if (response) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 500);
    }
  }, [response]);

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

  // Add event listener for startup toggles
  useEffect(() => {
    const handleToggle = (event: CustomEvent<number>) => {
      toggleStartup(event.detail);
    };

    document.addEventListener("toggleStartup", handleToggle as EventListener);
    return () => {
      document.removeEventListener(
        "toggleStartup",
        handleToggle as EventListener
      );
    };
  }, []);

  // Update startup visibility when expandedStartups changes
  useEffect(() => {
    if (!response) return;

    // Use a slight delay to ensure DOM is updated after dangerouslySetInnerHTML
    const timeoutId = setTimeout(() => {
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
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [expandedStartups, response]);

  return (
    <div ref={resultsRef} className="animate-fadeIn relative">
      {/* Decorative patterns */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-70" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-xl opacity-60" />
      <div className="absolute -left-20 bottom-40 w-24 h-24 bg-green-100 rounded-full blur-xl opacity-60" />

      <div className="relative max-w-4xl mx-auto">
        <div className="p-1.5 bg-gradient-to-r from-blue-400/30 via-investa-primary/30 to-purple-400/30 rounded-2xl mb-8 shadow-xl">
          <div className="bg-white rounded-2xl px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-investa-gray">
              <svg
                className="w-5 h-5 text-investa-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span className="text-sm font-medium">
                Investment Analysis Results
              </span>
            </div>
            <button
              onClick={onNewSearch}
              className="text-xs px-4 py-2 rounded-full bg-gray-100 text-investa-gray hover:bg-gray-200 transition-colors flex items-center gap-1.5 hover:text-investa-primary/80"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>New Search</span>
            </button>
          </div>
        </div>
        <div
          className="transition-all duration-500 hover:scale-[1.01]"
          dangerouslySetInnerHTML={{ __html: response.content }}
        />
        <Citations citations={response.citations || []} />
      </div>
    </div>
  );
};

export default AnalysisResults;
