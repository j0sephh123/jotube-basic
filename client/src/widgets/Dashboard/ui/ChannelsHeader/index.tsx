import {
  useDashboardContext,
  useChannelsDashboardQuery,
} from "@features/Dashboard";
import { ViewTypeToggle } from "@widgets/Dashboard";
import { PaginationControl } from "@widgets/PaginationControl";
import { Button } from "@shared/ui";

export default function ChannelsHeader() {
  const { setRequestBodyBatch } = useDashboardContext();
  const { data } = useChannelsDashboardQuery();

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

        <ViewTypeToggle />
        <PaginationControl total={data?.total || 0} />
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleClearFilters} variant="ghost" size="sm">
          Clear Filters
        </Button>
        <span className="text-sm text-base-content/60">
          {data?.total || 0} channels
        </span>
      </div>
    </div>
  );
}
