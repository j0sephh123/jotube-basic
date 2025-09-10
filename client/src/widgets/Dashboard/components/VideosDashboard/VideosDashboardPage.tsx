import { SortDirectionFilter, VideosDashboard } from "@widgets/Dashboard";
import { RangePicker } from "@widgets/RangePicker";

export default function VideosDashboardPage() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SortDirectionFilter />
          <RangePicker
            minLabel="Min"
            maxLabel="Max"
            minKey="min"
            maxKey="max"
            identifier="videosMinMax"
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <VideosDashboard />
      </div>
    </>
  );
}
