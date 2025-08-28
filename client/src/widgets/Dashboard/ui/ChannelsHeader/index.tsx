import { useChannelsDashboardQuery } from "@features/Dashboard";
import { ViewTypeToggle } from "@widgets/Dashboard";
import { PaginationControl } from "@widgets/PaginationControl";
import { SelectSortDirection } from "@widgets/Dashboard";

export default function ChannelsHeader() {
  const { data } = useChannelsDashboardQuery();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <SelectSortDirection />
        <ViewTypeToggle />
      </div>
      <PaginationControl total={data?.total || 0} />
    </div>
  );
}
