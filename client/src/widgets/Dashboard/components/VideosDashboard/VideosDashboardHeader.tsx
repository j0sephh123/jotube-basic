import { CommonDashboardHeaderWrapper } from "@widgets/Dashboard";
import { RangePicker } from "@widgets/RangePicker";
import {
  SortDirectionFilter,
  VideosDashboardViewTypeToggle,
} from "@widgets/Dashboard";
import { useParams } from "react-router-dom";

export function VideosDashboardHeader() {
  const { videosDashboardViewType } = useParams<{
    videosDashboardViewType: string;
  }>();

  return (
    <CommonDashboardHeaderWrapper>
      {videosDashboardViewType === "screenshots" && (
        <>
          <SortDirectionFilter />
          <RangePicker
            minLabel="Min"
            maxLabel="Max"
            minKey="min"
            maxKey="max"
            identifier="videosMinMax"
          />
        </>
      )}
      <VideosDashboardViewTypeToggle />
    </CommonDashboardHeaderWrapper>
  );
}
