import { SlidersHorizontal } from "lucide-react";
import { RangeFilterBase } from "@widgets/RangePicker/ui/RangeFilter";
import { CommonRangeFilterPopover } from "@features/Dashboard/widgets/RangePicker/CommonRangeFilterPopover";
import { RangePickerTypes } from "@store/store-types";

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
