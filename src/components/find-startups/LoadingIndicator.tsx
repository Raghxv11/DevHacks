import React from "react";

interface LoadingIndicatorProps {
  progress: number;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ progress }) => {
  return (
    <div className="text-center animate-pulse bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-investa-primary/10">
      <div className="flex justify-center mb-4">
        <svg
          className="w-16 h-16 text-investa-primary animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <div className="relative h-3 w-full max-w-md mx-auto bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-investa-primary rounded-full"
          style={{
            width: `${progress}%`,
            transition: "width 0.5s ease-out",
          }}
        />
      </div>
      <p className="mt-5 text-investa-dark flex items-center justify-center gap-2 text-lg font-semibold">
        Researching investment opportunities...
      </p>
      <div className="mt-3 text-sm text-investa-gray">
        Analyzing market data and startup trends
      </div>
    </div>
  );
};

export default LoadingIndicator;
