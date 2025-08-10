import { SlidersHorizontal } from "lucide-react";
import VideosDefaultsRangeFilter from "./VideosDefaultsRangeFilter";
import { CommonRangeFilterPopover } from "../RangePicker/CommonRangeFilterPopover";

export default function VideosDefaultsRangeFilterPopover() {
  return (
    <CommonRangeFilterPopover
      buttonLabel="Default Screenshots Range Filter"
      title="Default Screenshots Range Filter"
      icon={<SlidersHorizontal className="w-4 h-4" />}
    >
      <VideosDefaultsRangeFilter />
    </CommonRangeFilterPopover>
  );
}
