import { SlidersHorizontal } from "lucide-react";
import { RangeFilterBase } from "./RangeFilter";
import { CommonRangeFilterPopover } from "./CommonRangeFilterPopover";

// Local type definitions to avoid model layer dependency
enum LocalRangePickerTypes {
  PROCESSED = "processed",
  DEFAULTS = "defaults",
}

export default function DefaultsRangeFilterPopover() {
  return (
    <CommonRangeFilterPopover
      buttonLabel="Defaults Range"
      title="Defaults Range Filter"
      icon={<SlidersHorizontal className="w-4 h-4" />}
    >
      <RangeFilterBase
        rangeKey={LocalRangePickerTypes.DEFAULTS}
        minKey="defaultMin"
        maxKey="defaultMax"
      />
    </CommonRangeFilterPopover>
  );
}
