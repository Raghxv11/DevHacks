import React from "react";

const Footer: React.FC<{ hasResponse: boolean }> = ({ hasResponse }) => {
  return (
    <div
      className={`mt-20 text-center text-investa-gray/70 text-sm ${
        hasResponse ? "pt-12 border-t border-gray-100" : ""
      }`}
    >
      <p>
        © 2025 Renvue. All investment data is simulated for demonstration
        purposes only.
      </p>
    </div>
  );
};

export default Footer;
