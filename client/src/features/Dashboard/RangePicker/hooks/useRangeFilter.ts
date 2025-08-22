import { useMemo, useEffect } from "react";
import { useDashboardContext } from "@features/Dashboard/model/useDashboardContext";
import { useRangePickers } from "@app/providers/store/store-hooks";
import { RangePickerTypes, RequestBodyKey } from "../model/types";

export const useRangeFilter = (
  rangeKey: RangePickerTypes,
  minKey: RequestBodyKey,
  maxKey: RequestBodyKey
) => {
  const { requestBody } = useDashboardContext();
  const { setRangePicker, getRangePicker } = useRangePickers();
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
    const maxValue =
      currentFilter.max === null ? rangePicker.max : currentFilter.max;
    const shouldUpdate =
      rangePicker.values[0] !== currentFilter.min ||
      rangePicker.values[1] !== maxValue;
    if (shouldUpdate) {
      setRangePicker(rangeKey, {
        values: [currentFilter.min, maxValue],
        min: rangePicker.min,
        max: rangePicker.max,
        stepSize: rangePicker.stepSize,
      });
    }
  }, [
    currentFilter.min,
    currentFilter.max,
    setRangePicker,
    rangePicker,
    rangeKey,
  ]);

  return {
    currentFilter,
    rangePicker,
  };
};
