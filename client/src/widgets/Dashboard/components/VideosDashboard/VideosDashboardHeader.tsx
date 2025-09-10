import { CommonDashboardHeaderWrapper } from "@widgets/Dashboard";
import { RangePicker } from "@widgets/RangePicker";
import { SortDirectionFilter } from "@widgets/Dashboard";

export function VideosDashboardHeader() {
  return (
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
  );
}
