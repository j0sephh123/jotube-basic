import { CustomLink } from "@shared/ui";
import { RangePicker } from "@widgets/RangePicker";
import { useParams } from "react-router-dom";
import { type To } from "@shared/types";
import { SortDirectionFilter } from "./SortDirectionFilter";
import { DashboardTypeSwitcher } from "./DashboardTypeSwitcher";

const videoOrder = ["has-storyboards", "saved", "thumbnails", "processed"];

const links: Record<"channels" | "videos", string[]> = {
  channels: ["no-uploads", "no-screenshots", ...videoOrder],
  videos: videoOrder,
};

export function CommonHeader() {
  const { viewType, dashboardType } = useParams<{
    viewType: string;
    dashboardType: "channels" | "videos";
  }>();

  const showVideosRangePicker =
    dashboardType === "videos" && viewType === "processed";
  const showChannelsDefaultRangePicker =
    dashboardType === "channels" && viewType === "processed";
  const showChannelsRangePicker =
    dashboardType === "channels" && viewType === "processed";
  const hideSortDirectionFilter =
    dashboardType === "videos" && viewType !== "processed";

  return (
    <div className="grid grid-cols-[200px_650px_auto] items-center gap-4 h-[62px]">
      <DashboardTypeSwitcher />
      <div role="tablist" className="tabs tabs-border">
        {links[dashboardType as "channels" | "videos"].map((type) => {
          return (
            <CustomLink
              key={type}
              to={`/dashboard/${dashboardType}/${type}` as To}
              className={`tab ${viewType === type ? "tab-active" : ""}`}
            >
              {type}
            </CustomLink>
          );
        })}
      </div>
      <div className="flex items-center gap-4 justify-self-end">
        {!hideSortDirectionFilter && <SortDirectionFilter />}
        {showChannelsRangePicker && (
          <RangePicker
            wrapperClassName="w-[120px]"
            minLabel="Min"
            maxLabel="Max"
            minKey="min"
            maxKey="max"
            identifier="channelsMinMax"
          />
        )}
        {showChannelsDefaultRangePicker && (
          <RangePicker
            minLabel="Default Min"
            maxLabel="Default Max"
            minKey="defaultMin"
            maxKey="defaultMax"
            identifier="channelsDefaultMinMax"
          />
        )}
        {showVideosRangePicker && (
          <RangePicker
            minLabel="Min"
            maxLabel="Max"
            minKey="min"
            maxKey="max"
            identifier="videosMinMax"
          />
        )}
      </div>
    </div>
  );
}
