import { SelectSortDirection } from "@widgets/Dashboard";
import VideosPaginationControl from "./VideosPaginationControl";
import { useVideosDashboardQuery } from "@features/Dashboard";

export default function VideosHeader() {
  const { data } = useVideosDashboardQuery();

  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-nowrap items-center gap-2">
          <SelectSortDirection />
          <span className="text-sm whitespace-nowrap">
            {data?.total} results
          </span>
        </div>
        {data && data.total > 0 && (
          <VideosPaginationControl total={data.total} />
        )}
      </div>
    </div>
  );
}
