import { SlidersHorizontal } from "lucide-react";
import VideosRangeFilter from "./VideosRangeFilter";
import { CommonRangeFilterPopover } from "@/widgets/RangePicker/ui/CommonRangeFilterPopover";

export default function VideosRangeFilterPopover() {
  return (
    <CommonRangeFilterPopover
      buttonLabel="Screenshots Range Filter"
      title="Screenshots Range Filter"
      icon={<SlidersHorizontal className="w-4 h-4" />}
    >
      <VideosRangeFilter />
    </CommonRangeFilterPopover>
  );
}
