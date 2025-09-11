export type SegmentedValue = "left" | "right";

type SegmentedSwitchProps = {
  leftLabel: string;
  rightLabel: string;
  value: SegmentedValue;
  onChange: (v: SegmentedValue) => void;
  className?: string;
};

export function SegmentedSwitch({
  leftLabel,
  rightLabel,
  value,
  onChange,
  className,
}: SegmentedSwitchProps) {
  return (
    <div
      className={[
        "flex w-48 rounded-full overflow-hidden border-2 border-primary bg-base-200",
        className ?? "",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => onChange("left")}
        className={[
          "w-1/2 py-1.5 text-sm font-medium transition-colors duration-200",
          value === "left"
            ? "bg-primary text-primary-content"
            : "bg-base-200 text-base-content/80 hover:bg-base-300",
        ].join(" ")}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("right")}
        className={[
          "w-1/2 py-1.5 text-sm font-medium transition-colors duration-200",
          value === "right"
            ? "bg-primary text-primary-content"
            : "bg-base-200 text-base-content/80 hover:bg-base-300",
        ].join(" ")}
      >
        {rightLabel}
      </button>
    </div>
  );
}