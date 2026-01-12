import React from "react";

const BackgroundDecorations: React.FC = () => {
  return (
    <>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 30px 30px, #f0f0f0 2px, transparent 0)`,
          backgroundSize: "60px 60px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-green-500/5 rounded-full blur-2xl" />
    </>
  );
};

export default BackgroundDecorations;
