import { useState, useEffect } from "react";
import { RangePickerProps } from "../model/types";
import { useRangePicker } from "../hooks/useRangePicker";
import Button from "./Button";

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
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      const currentMax = maxValue ? parseInt(maxValue, 10) : max;
      if (numValue <= currentMax) {
        handleRangeChange([numValue, currentMax]);
      }
    }
  };

  const handleMaxChange = (value: string) => {
    setMaxValue(value);
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      const currentMin = parseInt(minValue, 10);
      if (numValue >= currentMin) {
        handleRangeChange([currentMin, numValue]);
      }
    } else if (value === "") {
      const currentMin = parseInt(minValue, 10);
      handleRangeChange([currentMin, max]);
    }
  };

  const handleResetClick = () => {
    handleReset();
    setMinValue(min.toString());
    setMaxValue("");
  };

  const formatValue = (value: number) => {
    if (value === max) {
      return "∞";
    }
    return value.toString();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Range</span>
        <Button
          onClick={handleResetClick}
          className="text-xs text-base-content/60 hover:text-base-content"
        >
          Reset
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs text-base-content/60">Min</label>
            <input
              type="number"
              value={minValue}
              onChange={(e) => handleMinChange(e.target.value)}
              className="input input-sm input-bordered w-full"
              min={min}
              max={max}
              step={stepSize}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-base-content/60">Max</label>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => handleMaxChange(e.target.value)}
              className="input input-sm input-bordered w-full"
              min={min}
              max={max}
              step={stepSize}
              placeholder="∞"
            />
          </div>
        </div>

        <div className="flex justify-between text-xs text-base-content/60">
          <span>{formatValue(safeValues[0] || min)}</span>
          <span>{formatValue(safeValues[1] || max)}</span>
        </div>
      </div>
    </div>
  );
}
