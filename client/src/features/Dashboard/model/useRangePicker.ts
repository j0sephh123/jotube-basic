import { useMemo } from "react";
import { useStore } from "@/app/providers/store/store";
import { useDashboardContext } from "./useDashboardContext";

export enum RangePickerTypes {
  PROCESSED = "processed",
  DEFAULTS = "defaults",
}

type RangePickerConfig = {
  values: ReadonlyArray<number>;
  min: number;
  max: number;
  stepSize: number;
};

export const useRangePicker = (rangeKey: RangePickerTypes) => {
  const { setRequestBodyBatch } = useDashboardContext();
  const { rangePickers, updateRangePickerValues } = useStore();
  const config = rangePickers[rangeKey];

  const defaultConfig: RangePickerConfig = {
    values: [0, 100],
    min: 0,
    max: 100,
    stepSize: 1,
  };

  const { values, min, max, stepSize } = config || defaultConfig;

  const safeValues = useMemo(() => {
    return values && values.length >= 2 ? values : [min, max];
  }, [values, min, max]);

  const handleRangeChange = (newValues: [number, number]) => {
    updateRangePickerValues(rangeKey, newValues);

    if (rangeKey === RangePickerTypes.PROCESSED) {
      setRequestBodyBatch({
        min: newValues[0],
        max: newValues[1] === max ? null : newValues[1],
        page: 1,
      });
    } else if (rangeKey === RangePickerTypes.DEFAULTS) {
      setRequestBodyBatch({
        defaultMin: newValues[0],
        defaultMax: newValues[1] === max ? null : newValues[1],
        page: 1,
      });
    }
  };

  const handleReset = () => {
    updateRangePickerValues(rangeKey, [min, max]);
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

  return {
    safeValues,
    min,
    max,
    stepSize,
    handleRangeChange,
    handleReset,
  };
};
