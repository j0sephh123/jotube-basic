import { RotateCcw } from "lucide-react";
import RangeFilterPopover from "@widgets/RangePicker/ui/RangeFilterPopover";
import DefaultsRangeFilterPopover from "@features/Dashboard/widgets/RangePicker/DefaultsRangeFilterPopover";
import SelectSortDirection from "@features/Dashboard/components/ChannelsHeader/SelectSortDirection";
import ViewTypeToggle from "@features/Dashboard/components/ChannelsHeader/ViewTypeToggle";
import PaginationControl from "@widgets/PaginationControl/ui/PaginationControl";
import { useDashboardContext } from "@widgets/Dashboard/model/useDashboardContext";
import {
  useDashboardParams,
  ViewType,
} from "@shared/hooks/useDashboardParams";
import Button from "@shared/ui/button";
import { useChannelsDashboardQuery } from "@widgets/Dashboard/api/useChannelsDashboardQuery";

const showRangeFilterForViewTypes = [ViewType.SAVED, ViewType.PROCESSED];

export default function ChannelsHeader() {
  const { viewType } = useDashboardParams();
  const { handleClearFilters } = useDashboardContext();
  const { data } = useChannelsDashboardQuery();

  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-nowrap items-center gap-2">
          <SelectSortDirection />
          <ViewTypeToggle />
          <span className="text-sm whitespace-nowrap">
            {data?.total} results
          </span>
          {showRangeFilterForViewTypes.includes(viewType) && (
            <>
              <RangeFilterPopover />
              <DefaultsRangeFilterPopover />
              <Button onClick={handleClearFilters}>
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
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
