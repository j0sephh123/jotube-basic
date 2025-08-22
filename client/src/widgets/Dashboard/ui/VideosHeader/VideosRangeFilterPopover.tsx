import { SlidersHorizontal } from "lucide-react";
import VideosRangeFilter from "./VideosRangeFilter";
import { CommonRangeFilterPopover } from "@features/Dashboard";

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
