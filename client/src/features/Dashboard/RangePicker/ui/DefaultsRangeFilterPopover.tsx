import { SlidersHorizontal } from "lucide-react";
import { RangeFilterBase } from "@features/Dashboard/RangePicker/ui/RangeFilter";
import { CommonRangeFilterPopover } from "@features/Dashboard/RangePicker/ui/CommonRangeFilterPopover";
import { RangePickerTypes } from "../model/types";

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
