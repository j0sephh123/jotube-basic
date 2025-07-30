import { RotateCcw } from "lucide-react";
import { useLocation } from "react-router-dom";
import RangeFilterPopover from "./RangeFilterPopover";
import DefaultsRangeFilterPopover from "./DefaultsRangeFilterPopover";
import SelectSortDirection from "./SelectSortDirection";
import ViewTypeToggle from "./ViewTypeToggle";
import { useDashboardQuery } from "@/features/Dashboard/hooks/useDashboardQuery";
import PaginationControl from "./PaginationControl";
import { useDashboardContext } from "./useDashboardContext";
import { routes } from "@/shared/utils/routes";

export default function DashboardHeader() {
  const location = useLocation();
  const { viewType, handleClearFilters } = useDashboardContext();
  const { data } = useDashboardQuery();

  const isChannelsWithoutUploads = location.pathname === routes.newChannels();
  const isChannelsWithoutScreenshots =
    location.pathname === routes.channelsWithoutScreenshots();

  if (isChannelsWithoutUploads || isChannelsWithoutScreenshots) {
    return (
      <div className="p-3 border-b border-base-300">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-nowrap items-center gap-2">
            <div className="w-24"></div>
            <ViewTypeToggle />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-nowrap items-center gap-2">
          <SelectSortDirection />
          <ViewTypeToggle />
          <span className="text-sm whitespace-nowrap">
            {data?.total} results
          </span>
          {viewType !== "saved" && (
            <>
              <RangeFilterPopover />
              <DefaultsRangeFilterPopover />
              <button
                onClick={handleClearFilters}
                className="btn btn-sm btn-outline gap-2"
                title="Reset filters"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </>
          )}
        </div>

        {data && (
          <div className="bg-base-100 border-t border-base-300 rounded-b-lg">
            <PaginationControl total={data.total} />
          </div>
        )}
      </div>
    </div>
  );
}
