import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { useDashboardContext } from "../../hooks/useDashboardContext";
import { RangePickerTypes } from "@/store/store-types";

type RangePickerProps = {
  rangeKey: RangePickerTypes;
};

export default function RangePicker({ rangeKey }: RangePickerProps) {
  const { setRequestBodyBatch } = useDashboardContext();
  const { rangePickers, updateRangePickerValues } = useStore();
  const config = rangePickers[rangeKey];

  const defaultConfig = {
    values: [0, 100] as ReadonlyArray<number>,
    min: 0,
    max: 100,
    stepSize: 1,
  };

  const { values, min, max, stepSize } = config || defaultConfig;
  const safeValues = values && values.length >= 2 ? values : [min, max];

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
        updateRangePickerValues(rangeKey, [numValue, currentMax]);
        if (rangeKey === RangePickerTypes.PROCESSED) {
          setRequestBodyBatch({
            min: numValue,
            max: currentMax === max ? null : currentMax,
            page: 1,
          });
        } else if (rangeKey === RangePickerTypes.DEFAULTS) {
          setRequestBodyBatch({
            defaultMin: numValue,
            defaultMax: currentMax === max ? null : currentMax,
            page: 1,
          });
        }
      }
    }
  };

  const handleMaxChange = (value: string) => {
    setMaxValue(value);
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      const currentMin = parseInt(minValue, 10);
      if (numValue >= currentMin) {
        updateRangePickerValues(rangeKey, [currentMin, numValue]);
        if (rangeKey === RangePickerTypes.PROCESSED) {
          setRequestBodyBatch({
            min: currentMin,
            max: numValue === max ? null : numValue,
            page: 1,
          });
        } else if (rangeKey === RangePickerTypes.DEFAULTS) {
          setRequestBodyBatch({
            defaultMin: currentMin,
            defaultMax: numValue === max ? null : numValue,
            page: 1,
          });
        }
      }
    } else if (value === "") {
      const currentMin = parseInt(minValue, 10);
      updateRangePickerValues(rangeKey, [currentMin, max]);
      if (rangeKey === RangePickerTypes.PROCESSED) {
        setRequestBodyBatch({
          min: currentMin,
          max: null,
          page: 1,
        });
      } else if (rangeKey === RangePickerTypes.DEFAULTS) {
        setRequestBodyBatch({
          defaultMin: currentMin,
          defaultMax: null,
          page: 1,
        });
      }
    }
  };

  const handleReset = () => {
    updateRangePickerValues(rangeKey, [min, max]);
    setMinValue(min.toString());
    setMaxValue("");
    if (rangeKey === RangePickerTypes.PROCESSED) {
      setRequestBodyBatch({
        min: 0,
        max: null,
        page: 1,
      });
    } else if (rangeKey === RangePickerTypes.DEFAULTS) {
      setRequestBodyBatch({
        defaultMin: 0,
        defaultMax: null,
        page: 1,
      });
    }
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
        <button
          onClick={handleReset}
          className="text-xs text-base-content/60 hover:text-base-content"
        >
          Reset
        </button>
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
