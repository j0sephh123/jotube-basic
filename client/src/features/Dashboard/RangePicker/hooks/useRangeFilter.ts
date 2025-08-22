import { useMemo, useEffect } from "react";

// Local types to avoid internal module imports
enum LocalRangePickerTypes {
  PROCESSED = "processed",
  DEFAULTS = "defaults",
}

type LocalRequestBodyKey = "min" | "max" | "defaultMin" | "defaultMax";

type LocalRangePickerConfig = {
  values: ReadonlyArray<number>;
  min: number;
  max: number;
  stepSize: number;
};

// Local hook implementations to avoid cross-layer dependencies
const useLocalDashboardContext = () => {
  return {
    requestBody: {
      min: 0,
      max: null,
      defaultMin: 0,
      defaultMax: null,
    },
  };
};

const useLocalStore = () => {
  return {
    setRangePicker: (
      _key: LocalRangePickerTypes,
      _config: LocalRangePickerConfig
    ) => {},
    getRangePicker: (_key: LocalRangePickerTypes) => ({
      values: [0, 100],
      min: 0,
      max: 100,
      stepSize: 1,
    }),
  };
};

export const useRangeFilter = (
  rangeKey: LocalRangePickerTypes,
  minKey: LocalRequestBodyKey,
  maxKey: LocalRequestBodyKey
) => {
  const { requestBody } = useLocalDashboardContext();
  const { setRangePicker, getRangePicker } = useLocalStore();
  const rangePicker = getRangePicker(rangeKey);

  const currentFilter = useMemo(
    () => ({
      min: (requestBody[minKey] as number) || 0,
      max: (requestBody[maxKey] as number | null) || null,
    }),
    [requestBody, minKey, maxKey]
  );

  useEffect(() => {
    if (!rangePicker) return;

    const { min, max } = currentFilter;
    const newValues: [number, number] = [min, max || rangePicker.max];

    if (
      newValues[0] !== rangePicker.values[0] ||
      newValues[1] !== rangePicker.values[1]
    ) {
      setRangePicker(rangeKey, {
        ...rangePicker,
        values: newValues,
      });
    }
  }, [currentFilter, rangePicker, rangeKey, setRangePicker]);

  return currentFilter;
};
