import { RotateCcw } from "lucide-react";
import RangeFilterPopover from "../RangePicker/RangeFilterPopover";
import DefaultsRangeFilterPopover from "../RangePicker/DefaultsRangeFilterPopover";
import SelectSortDirection from "./SelectSortDirection";
import ViewTypeToggle from "./ViewTypeToggle";
import { useDashboardQuery } from "@/features/Dashboard/hooks/useDashboardQuery";
import PaginationControl from "../PaginationControl";
import { useDashboardContext } from "../../hooks/useDashboardContext";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";

export default function DashboardHeader() {
  const viewType = useTypedViewType();
  const { handleClearFilters } = useDashboardContext();
  const { data } = useDashboardQuery();

  const isChannelsView =
    viewType === ViewType.CHANNELS_WITHOUT_UPLOADS ||
    viewType === ViewType.CHANNELS_WITHOUT_SCREENSHOTS;

  if (isChannelsView) {
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
          {viewType !== ViewType.SAVED && (
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
