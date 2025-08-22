import { useMemo, useEffect } from "react";
import { useDashboardContext } from "@/features/Dashboard/model/useDashboardContext";
import { useStore } from "@/app/providers/store/store";
import {
  RangePickerTypes,
  DashboardSlice,
} from "@/app/providers/store/store-types";
import RangePicker from "@widgets/RangePicker/ui/RangePicker";

type RequestBodyKey = keyof DashboardSlice["requestBody"];

type RangeFilterBaseProps = {
  rangeKey: RangePickerTypes;
  minKey: RequestBodyKey;
  maxKey: RequestBodyKey;
};

export function RangeFilterBase({
  rangeKey,
  minKey,
  maxKey,
}: RangeFilterBaseProps) {
  const { requestBody } = useDashboardContext();
  const { setRangePicker, getRangePicker } = useStore();
  const rangePicker = getRangePicker(rangeKey);

  const currentFilter = useMemo(
    () => ({
      min: (requestBody[minKey] as number) || 0,
      max: (requestBody[maxKey] as number | null) || null,
    }),
    [requestBody[minKey], requestBody[maxKey]]
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

  return (
    <div className="flex items-center gap-2">
      <RangePicker rangeKey={rangeKey} />
    </div>
  );
}

export default function RangeFilter() {
  return (
    <RangeFilterBase
      rangeKey={RangePickerTypes.PROCESSED}
      minKey="min"
      maxKey="max"
    />
  );
}
