import { SlidersHorizontal } from "lucide-react";
import { RangeFilterBase } from "./RangeFilter";
import { CommonRangeFilterPopover } from "./CommonRangeFilterPopover";
import { RangePickerTypes } from "../model/types";

export default function RangeFilterPopover() {
  return (
    <CommonRangeFilterPopover
      buttonLabel="Range Filter"
      title="Range Filter"
      icon={<SlidersHorizontal className="w-4 h-4" />}
    >
      <RangeFilterBase
        rangeKey={RangePickerTypes.PROCESSED}
        minKey="min"
        maxKey="max"
      />
    </CommonRangeFilterPopover>
  );
}
