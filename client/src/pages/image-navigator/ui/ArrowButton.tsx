interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export default function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  const arrowPath = direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";

  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 bg-base-100/80 hover:bg-base-100 text-base-content rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
