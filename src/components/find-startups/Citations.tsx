import React from "react";

interface CitationsProps {
  citations: string[];
}

const Citations: React.FC<CitationsProps> = ({ citations }) => {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="mt-14 pt-8 border-t border-gray-200">
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-investa-primary/10">
        <h3 className="text-xl font-semibold text-investa-primary mb-6 flex items-center gap-2">
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Sources
        </h3>
        <ul className="space-y-3">
          {citations.map((citation, index) => (
            <li
              key={index}
              className="flex gap-4 text-investa-gray bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="text-investa-primary font-semibold">
                {index + 1}.
              </span>
              {citation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Citations;
