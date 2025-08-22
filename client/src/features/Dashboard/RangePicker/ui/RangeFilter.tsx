import RangePicker from "./RangePicker";
import type { RequestBodyKey } from "../model/types";
import { RangePickerTypes } from "../model/types";
import { useRangeFilter } from "../hooks/useRangeFilter";

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
  useRangeFilter(rangeKey, minKey, maxKey);

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
