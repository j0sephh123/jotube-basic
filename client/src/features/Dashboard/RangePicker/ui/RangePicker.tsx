import { useState, useEffect } from "react";
import { useRangePicker } from "@features/Dashboard";
import type { RangePickerTypes } from "@features/Dashboard";

type RangePickerProps = {
  rangeKey: RangePickerTypes;
};

type ButtonProps = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

function Button({ onClick, className = "", children }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-sm btn-ghost ${className}`}>
      {children}
    </button>
  );
}

export default function RangePicker({ rangeKey }: RangePickerProps) {
  const { safeValues, min, max, stepSize, handleRangeChange, handleReset } =
    useRangePicker(rangeKey);

  const [minValue, setMinValue] = useState(
    safeValues[0]?.toString() || min.toString()
  );
  const [maxValue, setMaxValue] = useState(
    safeValues[1] === max ? "" : safeValues[1]?.toString() || ""
  );

  useEffect(() => {
    setMinValue(safeValues[0]?.toString() || min.toString());
    setMaxValue(safeValues[1] === max ? "" : safeValues[1]?.toString() || "");
  }, [safeValues, max, min]);

  const handleMinChange = (value: string) => {
    setMinValue(value);
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      const maxVal = maxValue ? Number(maxValue) : max;
      if (numValue <= maxVal) {
        handleRangeChange([numValue, maxVal]);
      }
    }
  };

  const handleMaxChange = (value: string) => {
    setMaxValue(value);
    if (value === "") {
      const minVal = Number(minValue);
      handleRangeChange([minVal, max]);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue >= min && numValue <= max) {
        const minVal = Number(minValue);
        if (numValue >= minVal) {
          handleRangeChange([minVal, numValue]);
        }
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={minValue}
        onChange={(e) => handleMinChange(e.target.value)}
        min={min}
        max={max}
        step={stepSize}
        className="input input-sm input-bordered w-20"
      />
      <span className="text-sm">-</span>
      <input
        type="number"
        value={maxValue}
        onChange={(e) => handleMaxChange(e.target.value)}
        min={min}
        max={max}
        step={stepSize}
        className="input input-sm input-bordered w-20"
        placeholder={max.toString()}
      />
      <Button onClick={handleReset} className="btn-xs">
        Reset
      </Button>
    </div>
  );
}
