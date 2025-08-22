import { SlidersHorizontal } from "lucide-react";
import { RangeFilterBase } from "@features/Dashboard/RangePicker/ui/RangeFilter";
import { CommonRangeFilterPopover } from "@features/Dashboard/RangePicker/ui/CommonRangeFilterPopover";
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
