import { useChannelsDashboardQuery } from "@features/Dashboard";
import { ViewTypeToggle } from "@widgets/Dashboard";
import { PaginationControl } from "@widgets/PaginationControl";
import SelectSortDirection from "./SelectSortDirection";

export default function ChannelsHeader() {
  const { data } = useChannelsDashboardQuery();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <SelectSortDirection />
        <ViewTypeToggle />
        <PaginationControl total={data?.total || 0} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-base-content/60">
          {data?.total || 0} channels
        </span>
      </div>
    </div>
  );
}
