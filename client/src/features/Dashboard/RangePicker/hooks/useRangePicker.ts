import { useMemo } from "react";
import { useDashboardContext } from "../../model/useDashboardContext";
import { useRangePickersStore } from "../../hooks/useRangePickersStore";

// Local types to avoid internal module imports
enum LocalRangePickerTypes {
  PROCESSED = "processed",
  DEFAULTS = "defaults",
}

type LocalRangePickerConfig = {
  values: ReadonlyArray<number>;
  min: number;
  max: number;
  stepSize: number;
};

export const useRangePicker = (rangeKey: LocalRangePickerTypes) => {
  const { setRequestBodyBatch } = useDashboardContext();
  const { rangePickers, updateRangePickerValues } = useRangePickersStore();
  const config = rangePickers[rangeKey];

  const defaultConfig: LocalRangePickerConfig = {
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

    if (rangeKey === LocalRangePickerTypes.PROCESSED) {
      setRequestBodyBatch({
        min: newValues[0],
        max: newValues[1] === max ? null : newValues[1],
        page: 1,
      });
    } else if (rangeKey === LocalRangePickerTypes.DEFAULTS) {
      setRequestBodyBatch({
        defaultMin: newValues[0],
        defaultMax: newValues[1] === max ? null : newValues[1],
        page: 1,
      });
    }
  };

  const handleReset = () => {
    updateRangePickerValues(rangeKey, [min, max]);
    if (rangeKey === LocalRangePickerTypes.PROCESSED) {
      setRequestBodyBatch({
        min: 0,
        max: null,
        page: 1,
      });
    } else if (rangeKey === LocalRangePickerTypes.DEFAULTS) {
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
