import { SlidersHorizontal } from "lucide-react";
import { RangeFilterBase } from "./RangeFilter";
import { CommonRangeFilterPopover } from "./CommonRangeFilterPopover";
import { RangePickerTypes } from "@/store/store-types";

export default function DefaultsRangeFilterPopover() {
  return (
    <CommonRangeFilterPopover
      buttonLabel="Defaults Range"
      title="Defaults Range Filter"
      icon={<SlidersHorizontal className="w-4 h-4" />}
    >
      <RangeFilterBase
        rangeKey={RangePickerTypes.DEFAULTS}
        minKey="defaultMin"
        maxKey="defaultMax"
      />
    </CommonRangeFilterPopover>
  );
}
