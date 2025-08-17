import { RotateCcw } from "lucide-react";
import RangeFilterPopover from "../RangePicker/RangeFilterPopover";
import DefaultsRangeFilterPopover from "../RangePicker/DefaultsRangeFilterPopover";
import SelectSortDirection from "./SelectSortDirection";
import ViewTypeToggle from "./ViewTypeToggle";
import PaginationControl from "../PaginationControl";
import { useDashboardContext } from "../../hooks/useDashboardContext";
import {
  useDashboardParams,
  ViewType,
} from "@/shared/hooks/useDashboardParams";
import { useChannelsDashboardQuery } from "../../useChannelsDashboardQuery";
import Button from "@/shared/components/button";

const showRangeFilterForViewTypes = [ViewType.SAVED, ViewType.PROCESSED];

export default function DashboardHeader() {
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
