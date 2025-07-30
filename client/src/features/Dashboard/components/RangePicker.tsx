import { useRef, useState } from "react";
import { useRanger, Ranger } from "@tanstack/react-ranger";
import { useStore } from "@/store/store";
import { useDashboardContext } from "./useDashboardContext";
import { RangePickerTypes } from "@/store/store-types";

type RangePickerProps = {
  rangeKey: RangePickerTypes;
}

export default function RangePicker({ rangeKey }: RangePickerProps) {
  const rangerRef = useRef<HTMLDivElement>(null);
  const { setRequestBodyBatch } = useDashboardContext();
  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");

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

  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values: safeValues,
    min,
    max,
    stepSize,
    onChange: (instance: Ranger<HTMLDivElement>) => {
      updateRangePickerValues(rangeKey, instance.sortedValues);
      if (rangeKey === RangePickerTypes.PROCESSED) {
        setRequestBodyBatch({
          min: instance.sortedValues[0],
          max:
            instance.sortedValues[1] === max ? null : instance.sortedValues[1],
          page: 1,
        });
      } else if (rangeKey === RangePickerTypes.DEFAULTS) {
        setRequestBodyBatch({
          defaultMin: instance.sortedValues[0],
          defaultMax:
            instance.sortedValues[1] === max ? null : instance.sortedValues[1],
          page: 1,
        });
      }
    },
  });

  const handleReset = () => {
    updateRangePickerValues(rangeKey, [min, max]);
    if (rangeKey === RangePickerTypes.PROCESSED) {
      setRequestBodyBatch({
        min: null,
        max: null,
        page: 1,
      });
    } else if (rangeKey === RangePickerTypes.DEFAULTS) {
      setRequestBodyBatch({
        defaultMin: null,
        defaultMax: null,
        page: 1,
      });
    }
  };

  const handleCustomRangeSubmit = () => {
    const newMin = parseInt(customMin, 10);
    const newMax = parseInt(customMax, 10);

    if (!isNaN(newMin) && !isNaN(newMax) && newMin >= 0 && newMax > newMin) {
      const clampedMin = Math.max(min, Math.min(max, newMin));
      const clampedMax = Math.max(min, Math.min(max, newMax));

      updateRangePickerValues(rangeKey, [clampedMin, clampedMax]);

      if (rangeKey === RangePickerTypes.PROCESSED) {
        setRequestBodyBatch({
          min: clampedMin,
          max: clampedMax === max ? null : clampedMax,
          page: 1,
        });
      } else if (rangeKey === RangePickerTypes.DEFAULTS) {
        setRequestBodyBatch({
          defaultMin: clampedMin,
          defaultMax: clampedMax === max ? null : clampedMax,
          page: 1,
        });
      }

      setCustomMin("");
      setCustomMax("");
    }
  };

  const handleCustomRangeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCustomRangeSubmit();
    }
  };

  if (!config) {
    return <div>Range picker configuration not found for key: {rangeKey}</div>;
  }

  const minValue = safeValues[0] ?? min;
  const maxValue = safeValues[1] ?? max;
  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  const isAtDefault = minValue === min && maxValue === max;

  return (
    <div
      key={`range-picker-${rangeKey}-${safeValues.join("-")}`}
      className="flex items-center gap-2 bg-base-600 rounded-lg p-3 w-sm"
    >
      <div className="flex-1 min-w-0">
        <div className="relative py-1">
          <div
            ref={rangerRef}
            className="relative bg-secondary rounded-full cursor-pointer h-2"
            style={{ userSelect: "none" }}
          >
            <div
              className="absolute bg-primary rounded-full h-2"
              style={{
                left: `${minPercentage}%`,
                width: `${maxPercentage - minPercentage}%`,
              }}
            />

            {rangerInstance
              .handles()
              .map(
                (
                  {
                    value,
                    onKeyDownHandler,
                    onMouseDownHandler,
                    onTouchStart,
                    isActive,
                  },
                  i
                ) => (
                  <div
                    key={`${i}-${safeValues.join("-")}`}
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                    style={{
                      left: `${rangerInstance.getPercentageForValue(value)}%`,
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-base-800 text-base-content text-xs rounded shadow-lg whitespace-nowrap z-10">
                      {value}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-base-800"></div>
                    </div>
                    <div
                      className={`w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                        isActive ? "scale-110" : ""
                      }`}
                      onKeyDown={onKeyDownHandler}
                      onMouseDown={onMouseDownHandler}
                      onTouchStart={onTouchStart}
                      role="slider"
                      aria-valuemin={rangerInstance.options.min}
                      aria-valuemax={rangerInstance.options.max}
                      aria-valuenow={value}
                    />
                  </div>
                )
              )}
          </div>

          <div className="flex justify-between text-xs text-base-content/60 mt-1">
            <span>{min}</span>
            <span>{max}</span>
          </div>

          <div className="w-full absolute flex justify-center text-xs text-base-content/80 font-medium">
            Current Range: {minValue} - {maxValue}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-base-content/70 mb-2">Custom Range:</div>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={customMin}
              onChange={(e) => setCustomMin(e.target.value)}
              onKeyDown={handleCustomRangeKeyDown}
              placeholder="Min"
              className="input input-xs w-16 text-center"
              min={min}
              max={max - 1}
            />
            <span className="text-xs text-base-content/60">-</span>
            <input
              type="number"
              value={customMax}
              onChange={(e) => setCustomMax(e.target.value)}
              onKeyDown={handleCustomRangeKeyDown}
              placeholder="Max"
              className="input input-xs w-16 text-center"
              min={min + 1}
              max={max}
            />
            <button
              onClick={handleCustomRangeSubmit}
              disabled={!customMin || !customMax}
              className="btn btn-xs btn-primary"
              title="Apply custom range"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {!isAtDefault && (
        <button
          onClick={handleReset}
          className="btn btn-ghost btn-sm text-base-content/70 hover:text-base-content transition-colors"
          title="Reset to default range"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
