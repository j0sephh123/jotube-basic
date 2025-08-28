import { SelectSortDirection } from "@widgets/Dashboard";
import { useVideosDashboardQuery } from "@features/Dashboard";
import { PaginationControl } from "@widgets/PaginationControl";

export default function VideosHeader() {
  const { data } = useVideosDashboardQuery();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <SelectSortDirection />
      </div>
      <PaginationControl total={data?.total || 0} />
    </div>
  );
}
