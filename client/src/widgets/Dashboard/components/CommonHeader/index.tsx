import { CustomLink } from "@shared/ui";
import { RangePicker } from "@widgets/RangePicker";
import { useParams } from "react-router-dom";
import { type To } from "@shared/types";
import { SortDirectionFilter } from "./SortDirectionFilter";
import { DashboardTypeSwitcher } from "./DashboardTypeSwitcher";
// eslint-disable-next-line import/no-internal-modules
import { type DashboardType } from "@widgets/Dashboard/types";
import { PlaylistHeaderActions } from "../PlaylistHeaderActions";

const videoOrder = ["storyboards", "saved", "thumbnails", "processed"];

const links: Record<DashboardType, string[]> = {
  channels: ["no-uploads", "no-screenshots", ...videoOrder],
  videos: videoOrder,
  playlists: [
    "channels",
    "default",
    "saved",
    "storyboards",
    "thumbnails",
    "screenshots",
  ],
};

export function CommonHeader() {
  const { viewType, dashboardType } = useParams<{
    viewType: string;
    dashboardType: DashboardType;
  }>();

  const showVideosRangePicker =
    dashboardType === "videos" && viewType === "processed";
  const showChannelsDefaultRangePicker =
    dashboardType === "channels" && viewType === "processed";
  const showChannelsRangePicker =
    dashboardType === "channels" && viewType === "processed";
  const hideSortDirectionFilter =
    (dashboardType === "videos" && viewType !== "processed") ||
    dashboardType === "playlists";
  const showPlaylistsActions =
    dashboardType === "playlists" && viewType !== "channels";

  const playlistId = useParams().playlistId;

  return (
    <div className="flex justify-between items-center">
      <div>
        <DashboardTypeSwitcher />
        <div role="tablist" className="tabs tabs-border">
          {dashboardType &&
            links[dashboardType].map((type) => {
              let basePath = `/dashboard/${dashboardType}/${type}`;
              if (dashboardType === "playlists") {
                basePath += `/${playlistId}`;
              }

              return (
                <CustomLink
                  key={type}
                  to={basePath as To}
                  className={`tab ${viewType === type ? "tab-active" : ""}`}
                >
                  {type}
                </CustomLink>
              );
            })}
        </div>
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
        {showPlaylistsActions && <PlaylistHeaderActions />}
      </div>
    </div>
  );
}
