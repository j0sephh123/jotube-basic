import { useMemo, useEffect } from "react";
import { useDashboardContext } from "@features/Dashboard/model/useDashboardContext";
import { useStore } from "@/app/providers/store/store";
import type { RangePickerTypes, RequestBodyKey } from "../model/types";

export const useRangeFilter = (
  rangeKey: RangePickerTypes,
  minKey: RequestBodyKey,
  maxKey: RequestBodyKey
) => {
  const { requestBody } = useDashboardContext();
  const { setRangePicker, getRangePicker } = useStore();
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
