import { useRef, useState } from "react";
import { useRanger, Ranger } from "@tanstack/react-ranger";
import { useStore } from "@/store/store";
import { useDashboardContext } from "../../hooks/useDashboardContext";
import { RangePickerTypes } from "@/store/store-types";

type RangePickerProps = {
  rangeKey: RangePickerTypes;
};

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

  const handleCustomRangeReset = () => {
    setCustomMin("");
    setCustomMax("");
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
        <div
          ref={rangerRef}
          className="relative h-6 w-full"
          style={{
            touchAction: "none",
          }}
        >
          {rangerInstance.getTrackProps({
            style: {
              position: "absolute",
              height: "4px",
              width: "100%",
              backgroundColor: "hsl(var(--bc) / 0.2)",
              borderRadius: "2px",
              top: "50%",
              transform: "translateY(-50%)",
            },
          })}
          {rangerInstance.handles.map(
            ({ key, active, disabled, ...handleProps }, i) => (
              <button
                key={key}
                {...handleProps}
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-primary bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  active ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
                style={{
                  left: `${handleProps.style.left}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )
          )}
        </div>

        <div className="flex justify-between text-xs text-base-content/60">
          <span>{formatValue(safeValues[0])}</span>
          <span>{formatValue(safeValues[1])}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Custom Range</span>
          <button
            onClick={handleCustomRangeReset}
            className="text-xs text-base-content/60 hover:text-base-content"
          >
            Clear
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={customMin}
            onChange={(e) => setCustomMin(e.target.value)}
            onKeyDown={handleCustomRangeKeyDown}
            className="input input-sm input-bordered flex-1"
            min={min}
            max={max}
          />
          <input
            type="number"
            placeholder="Max"
            value={customMax}
            onChange={(e) => setCustomMax(e.target.value)}
            onKeyDown={handleCustomRangeKeyDown}
            className="input input-sm input-bordered flex-1"
            min={min}
            max={max}
          />
          <button
            onClick={handleCustomRangeSubmit}
            className="btn btn-sm btn-primary"
            disabled={!customMin || !customMax}
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
}
