import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-16">
      <Link href="/">
        <div className="font-bold text-3xl text-investa-primary flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-investa-primary/10 flex items-center justify-center">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          Renvue
        </div>
      </Link>
      <Link href="/">
        <button className="h-11 px-8 bg-investa-dark text-white rounded-full hover:bg-opacity-90 transition-all font-medium text-sm flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105 group">
          <span>Back to Home</span>
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      </Link>
    </header>
  );
};

export default Header;
