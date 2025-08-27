import { RotateCcw } from "lucide-react";

import SelectSortDirection from "./SelectSortDirection";
import VideosPaginationControl from "./VideosPaginationControl";
import {
  useVideosDashboardContext,
  useVideosDashboardQuery,
} from "@features/Dashboard";
import { Button } from "@shared/ui";

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

          <Button onClick={handleClearFilters}>
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
        {data && data.total > 0 && (
          <VideosPaginationControl total={data.total} />
        )}
      </div>
    </div>
  );
}
