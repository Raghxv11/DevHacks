import React from "react";

interface SuggestionButtonProps {
  suggestion: string;
  selectedSuggestion: string | null;
  productIdea: string;
  isLoading: boolean;
  onClick: (suggestion: string) => void;
}

const SuggestionButton: React.FC<SuggestionButtonProps> = ({
  suggestion,
  selectedSuggestion,
  productIdea,
  isLoading,
  onClick,
}) => {
  const isSelected = productIdea === suggestion && selectedSuggestion === suggestion;
  const isMatched = productIdea === suggestion;

  let className =
    "px-5 py-2.5 rounded-full text-sm border transition-all transform hover:scale-105 active:scale-95 duration-200 shadow-sm ";
  
  if (isSelected) {
    className +=
      "bg-investa-primary/20 text-investa-primary border-investa-primary/40 font-medium relative overflow-hidden";
  } else if (isMatched) {
    className +=
      "bg-investa-primary/10 text-investa-primary border-investa-primary/30 font-medium";
  } else {
    className +=
      "bg-white border-investa-gray/30 text-investa-gray hover:text-investa-primary hover:border-investa-primary/30 hover:bg-investa-primary/5";
  }

  const cursorClass = selectedSuggestion === suggestion ? "cursor-wait" : "cursor-pointer";

  return (
    <button
      type="button"
      onClick={() => onClick(suggestion)}
      disabled={isLoading || selectedSuggestion !== null}
      className={`${className} ${cursorClass}`}
    >
      {suggestion}
      {selectedSuggestion === suggestion && (
        <div className="absolute inset-0 flex items-center justify-center bg-investa-primary/5">
          <div className="h-4 w-4 rounded-full border-2 border-investa-primary/30 border-t-investa-primary animate-spin"></div>
        </div>
      )}
    </button>
  );
};

export default SuggestionButton;
