import { RotateCcw } from "lucide-react";
import VideosRangeFilterPopover from "./VideosRangeFilterPopover";
import SelectSortDirection from "./SelectSortDirection";
import VideosPaginationControl from "./VideosPaginationControl";
import { useVideosDashboardContext } from "@/features/Dashboard/model/useVideosDashboardContext";
import { useVideosDashboardQuery } from "@/features/Dashboard/api/useVideosDashboardQuery";
import Button from "@shared/ui/button";

export default function VideosHeader() {
  const { handleClearFilters } = useVideosDashboardContext();
  const { data } = useVideosDashboardQuery();

  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-nowrap items-center gap-2">
          <SelectSortDirection />
          <span className="text-sm whitespace-nowrap">
            {data?.total} results
          </span>
          <VideosRangeFilterPopover />
          <Button onClick={handleClearFilters}>
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
        {data && (
          <div className="bg-base-100 border-t border-base-300 rounded-b-lg">
            <VideosPaginationControl total={data.total} />
          </div>
        )}
      </div>
    </div>
  );
}
