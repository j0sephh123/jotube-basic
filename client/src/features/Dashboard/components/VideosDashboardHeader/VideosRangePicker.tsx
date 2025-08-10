import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { useVideosDashboardContext } from "../../hooks/useVideosDashboardContext";
import Button from "@/shared/button";

type VideosRangePickerProps = {
  rangeKey: string;
};

export default function VideosRangePicker({
  rangeKey,
}: VideosRangePickerProps) {
  const { setVideosRequestBodyBatch } = useVideosDashboardContext();
  const { videosRangePickers, updateVideosRangePickerValues } = useStore();
  const config = videosRangePickers[rangeKey];

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
        updateVideosRangePickerValues(rangeKey, [numValue, currentMax]);
        if (rangeKey === "screenshots") {
          setVideosRequestBodyBatch({
            minScreenshots: numValue,
            maxScreenshots: currentMax === max ? null : currentMax,
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
        updateVideosRangePickerValues(rangeKey, [currentMin, numValue]);
        if (rangeKey === "screenshots") {
          setVideosRequestBodyBatch({
            minScreenshots: currentMin,
            maxScreenshots: numValue === max ? null : numValue,
            page: 1,
          });
        }
      }
    } else if (value === "") {
      const currentMin = parseInt(minValue, 10);
      updateVideosRangePickerValues(rangeKey, [currentMin, max]);
      if (rangeKey === "screenshots") {
        setVideosRequestBodyBatch({
          minScreenshots: currentMin,
          maxScreenshots: null,
          page: 1,
        });
      }
    }
  };

  const handleReset = () => {
    setMinValue(min.toString());
    setMaxValue("");
    updateVideosRangePickerValues(rangeKey, [min, max]);
    if (rangeKey === "screenshots") {
      setVideosRequestBodyBatch({
        minScreenshots: min,
        maxScreenshots: null,
        page: 1,
      });
    }
  };

  const formatValue = (value: number) => {
    if (value === max) {
      return `${value}+`;
    }
    return value.toString();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={stepSize}
          value={minValue}
          onChange={(e) => handleMinChange(e.target.value)}
          className="input input-bordered input-sm w-20"
          placeholder={min.toString()}
        />
        <span className="text-sm">to</span>
        <input
          type="number"
          min={min}
          max={max}
          step={stepSize}
          value={maxValue}
          onChange={(e) => handleMaxChange(e.target.value)}
          className="input input-bordered input-sm w-20"
          placeholder={formatValue(max)}
        />
      </div>
      <Button onClick={handleReset} size="sm" variant="outline">
        Reset
      </Button>
    </div>
  );
}
