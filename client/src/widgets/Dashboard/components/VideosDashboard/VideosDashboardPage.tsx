import { SortDirectionFilter, VideosDashboard } from "@widgets/Dashboard";
import { CommonDashboardHeaderWrapper } from "@widgets/Dashboard";
import { RangePicker } from "@widgets/RangePicker";

export default function VideosDashboardPage() {
  return (
    <>
      <CommonDashboardHeaderWrapper>
        <SortDirectionFilter />
        <RangePicker
          minLabel="Min"
          maxLabel="Max"
          minKey="min"
          maxKey="max"
          identifier="videosMinMax"
        />
      </CommonDashboardHeaderWrapper>
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <VideosDashboard />
      </div>
    </>
  );
}
