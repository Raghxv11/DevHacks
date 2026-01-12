import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto mb-20">
      <h2 className="text-2xl font-bold text-center text-investa-dark mb-10 flex items-center justify-center gap-2">
        <svg
          className="w-6 h-6 text-investa-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>How It Works</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-investa-primary/20">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
            <svg
              className="w-8 h-8 text-blue-600"
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
          <h3 className="font-semibold text-xl mb-3 text-investa-dark">
            Describe Your Interest
          </h3>
          <p className="text-investa-gray">
            Enter the type of startup or investment sector you're interested in
            exploring.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-investa-primary/20">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-5">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-xl mb-3 text-investa-dark">
            Get Market Analysis
          </h3>
          <p className="text-investa-gray">
            Our AI analyzes market trends, existing players, and opportunities
            in the space.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-investa-primary/20">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-xl mb-3 text-investa-dark">
            Discover Opportunities
          </h3>
          <p className="text-investa-gray">
            Review active startups, their features, funding stages, and make
            informed investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
