interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}

export default function ArrowButton({
  direction,
  onClick,
  disabled = false,
}: ArrowButtonProps) {
  const arrowPath = direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 transform -translate-y-1/2 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
        disabled
          ? "bg-base-300 text-base-content/50 cursor-not-allowed"
          : "bg-base-100/80 hover:bg-base-100 text-base-content cursor-pointer"
      }`}
      style={{
        [direction === "left" ? "left" : "right"]: "0.5rem",
      }}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={arrowPath}
        />
      </svg>
    </button>
  );
}
