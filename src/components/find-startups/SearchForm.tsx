import React from "react";
import LoadingIndicator from "./LoadingIndicator";
import SuggestionButton from "./SuggestionButton";

interface SearchFormProps {
  productIdea: string;
  setProductIdea: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  inputError: string | null;
  setInputError: (error: string | null) => void;
  suggestions: string[];
  selectedSuggestion: string | null;
  handleSuggestionClick: (suggestion: string) => void;
  loadingProgress: number;
}

const SearchForm: React.FC<SearchFormProps> = ({
  productIdea,
  setProductIdea,
  handleSubmit,
  isLoading,
  inputError,
  setInputError,
  suggestions,
  selectedSuggestion,
  handleSuggestionClick,
  loadingProgress,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-3xl mx-auto mb-16 relative"
    >
      {/* Decorative elements */}
      <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          className="text-investa-primary/20"
          fill="currentColor"
        >
          <path d="M35.52 0.72C36.0772 0.0336 37.1228 0.0336 37.68 0.72C49.2656 14.7264 67.84 30.7264 67.84 48.96C67.84 65.6 53.76 78.88 36.6 78.88C19.44 78.88 5.36 65.6 5.36 48.96C5.36 30.7264 23.9344 14.7264 35.52 0.72Z" />
        </svg>
      </div>
      <div className="absolute -right-16 top-1/3 transform rotate-45 hidden lg:block">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="10"
            y="10"
            width="40"
            height="40"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            className="text-investa-primary/30"
          />
          <circle
            cx="30"
            cy="30"
            r="15"
            fill="currentColor"
            className="text-investa-primary/10"
          />
        </svg>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-investa-primary/10 p-8 md:p-10 relative overflow-hidden group transition-all duration-500 hover:shadow-investa-primary/5">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle
                id="pattern-circle"
                cx="10"
                cy="10"
                r="1.6257413380501518"
                fill="#000000"
              ></circle>
            </pattern>
            <rect
              id="rect"
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            ></rect>
          </svg>
        </div>

        <div className="relative">
          <h3 className="text-2xl font-bold text-investa-dark mb-6 text-center">
            What are you looking for?
          </h3>
          <div className="relative flex items-center">
            <div className="absolute left-5 text-investa-primary/70">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={productIdea}
              onChange={(e) => {
                setProductIdea(e.target.value);
                setInputError(null);
              }}
              placeholder="Describe the startup or investment sector you're interested in..."
              className="w-full h-14 pl-12 pr-32 bg-white rounded-full border-2 border-investa-primary/20 focus:border-investa-primary text-investa-dark text-lg focus:outline-none shadow-md focus:shadow-investa-primary/20 transition-all"
            />
            {!isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button
                  type="submit"
                  className="h-10 px-6 bg-gradient-to-r from-investa-primary to-investa-primary/90 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all font-medium text-sm flex items-center justify-center group"
                >
                  <span>Search</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {inputError && (
            <div className="absolute -bottom-6 left-0 w-full text-center">
              <span className="text-investa-primary text-sm flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {inputError}
              </span>
            </div>
          )}
        </div>

        <div className="mt-10">
          <p className="text-investa-gray text-sm mb-4 flex items-center gap-2 justify-center">
            <svg
              className="w-4 h-4 text-investa-primary"
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
            <span>Popular searches</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {suggestions.map((suggestion, index) => (
              <SuggestionButton
                key={index}
                suggestion={suggestion}
                selectedSuggestion={selectedSuggestion}
                productIdea={productIdea}
                isLoading={isLoading}
                onClick={handleSuggestionClick}
              />
            ))}
          </div>
        </div>
      </div>

      {isLoading && <LoadingIndicator progress={loadingProgress} />}
    </form>
  );
};

export default SearchForm;
