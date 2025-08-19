import { SlidersHorizontal } from "lucide-react";
import { RangeFilterBase } from "@widgets/RangePicker/ui/RangeFilter";
import { CommonRangeFilterPopover } from "@/widgets/RangePicker/ui/CommonRangeFilterPopover";
import { RangePickerTypes } from "@/app/providers/store/store-types";

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
