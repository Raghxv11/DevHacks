import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="text-center mb-16 relative">
      {/* Decorative elements */}
      <div className="absolute -top-12 left-1/4 w-20 h-20 bg-blue-100 rounded-full blur-xl opacity-70" />
      <div className="absolute top-10 right-1/4 w-32 h-32 bg-purple-100 rounded-full blur-xl opacity-60" />
      <div className="absolute -left-10 top-1/2 w-24 h-24 bg-yellow-100 rounded-full blur-xl opacity-60" />

      {/* Abstract shapes */}
      <div className="hidden md:block absolute -right-8 top-1/3 opacity-20">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="60"
            cy="60"
            r="40"
            stroke="currentColor"
            strokeWidth="2"
            className="text-investa-primary"
          />
          <path
            d="M30 60C30 43.4315 43.4315 30 60 30V90C43.4315 90 30 76.5685 30 60Z"
            fill="currentColor"
            className="text-investa-primary/20"
          />
          <circle
            cx="60"
            cy="60"
            r="15"
            fill="currentColor"
            className="text-investa-primary/30"
          />
        </svg>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-investa-dark leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-investa-dark to-investa-primary relative z-10">
        Find Investment Opportunities
      </h1>
      <p className="text-investa-gray text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
        Discover promising startups and market opportunities that match your
        investment criteria and align with your portfolio strategy.
      </p>
    </div>
  );
};

export default HeroSection;
