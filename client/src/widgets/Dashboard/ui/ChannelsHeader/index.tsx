import RangeFilterPopover from "@features/Dashboard/RangePicker/ui/RangeFilterPopover";
import DefaultsRangeFilterPopover from "@features/Dashboard/RangePicker/ui/DefaultsRangeFilterPopover";
import ViewTypeToggle from "@widgets/Dashboard/ui/ViewTypeToggle";
import PaginationControl from "@widgets/PaginationControl/ui/PaginationControl";
import { useDashboardContext } from "@features/Dashboard/model/useDashboardContext";
import { useDashboardParams } from "@features/Dashboard/lib/useDashboardParams";
import { Button } from "@shared/ui/button";
import { useChannelsDashboardQuery } from "@features/Dashboard/api/useChannelsDashboardQuery";

export default function ChannelsHeader() {
  const { requestBody, setRequestBodyBatch } = useDashboardContext();
  const { type } = useDashboardParams();
  const { data } = useChannelsDashboardQuery(requestBody);

  const handleClearFilters = () => {
    setRequestBodyBatch({
      min: 0,
      max: null,
      defaultMin: 0,
      defaultMax: null,
      page: 1,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <RangeFilterPopover />
        <DefaultsRangeFilterPopover />
        <ViewTypeToggle />
        <PaginationControl />
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleClearFilters} variant="ghost" size="sm">
          Clear Filters
        </Button>
        <span className="text-sm text-base-content/60">
          {data?.channelsDashboard?.totalCount || 0} channels
        </span>
      </div>
    </div>
  );
}
