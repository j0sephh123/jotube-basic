import { QuickSearch } from "@widgets/Search";
import {
  ViewGlobalScreenshots,
  VideoProcessingInfo,
  PlaylistsPopover,
  ThemeSwitcher,
} from "@widgets/Navbar";
import { Settings } from "@widgets/Settings";
import { useTotalCounts, useFreeSpace } from "@features/Statistics";
import {
  IconHome,
  IconPlaylist,
  IconVideos,
  IconSaved,
  IconThumbnails,
  IconImageNavigator,
  Text,
  IconProcessingLog,
  IconStoryboard,
  IconRecentlyViewed,
  IconTv,
  Menu,
} from "@shared/ui";

export default function Navbar() {
  const { data: totalCounts } = useTotalCounts();
  const { data: freeSpace } = useFreeSpace();

  return (
    <div className="flex flex-col fixed w-full bg-base-100 z-50">
      <div className="navbar shadow-sm flex justify-between items-center w-full">
        <div className="flex gap-2">
          <IconHome />
          <Menu
            buttonText="Quick Actions"
            items={[
              <IconThumbnails count={totalCounts?.totalThumbnails ?? 0} />,
              <IconStoryboard count={totalCounts?.totalStoryboards ?? 0} />,
              <ViewGlobalScreenshots />,
              <IconImageNavigator />,
            ]}
          />
          <Menu
            buttonText="History"
            items={[<IconRecentlyViewed />, <IconProcessingLog />]}
          />
          <Menu
            buttonText="Aggregates"
            items={[<IconVideos />, <IconPlaylist />, <IconTv />]}
          />
          <PlaylistsPopover />
          <IconSaved count={totalCounts?.totalSaved ?? 0} />
        </div>
        <div className="flex items-center gap-4">
          <QuickSearch />
          <Text text={`Free: ${freeSpace?.freeSpace ?? "..."}`} />
          <ThemeSwitcher />
          <Settings />
          <VideoProcessingInfo />
        </div>
      </div>
    </div>
  );
}
