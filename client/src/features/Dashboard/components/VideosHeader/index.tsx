import { RotateCcw } from "lucide-react";
import VideosRangeFilterPopover from "@features/Dashboard/components/VideosHeader/VideosRangeFilterPopover";
import SelectSortDirection from "@features/Dashboard/components/VideosHeader/SelectSortDirection";
import VideosPaginationControl from "@features/Dashboard/components/VideosHeader/VideosPaginationControl";
import { useVideosDashboardContext } from "@widgets/Dashboard/model/useVideosDashboardContext";
import { useVideosDashboardQuery } from "@widgets/Dashboard/api/useVideosDashboardQuery";
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
