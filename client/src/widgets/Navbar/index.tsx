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
} from "@shared/ui";

export default function Navbar() {
  const { data: totalCounts } = useTotalCounts();
  const { data: freeSpace } = useFreeSpace();

  return (
    <div className="flex flex-col w-full bg-base-100 z-50">
      <div className="navbar shadow-sm flex justify-between items-center w-full">
        <div className="flex gap-2">
          <IconHome />
          <div className="flex flex-col">
            <IconThumbnails count={totalCounts?.totalThumbnails ?? 0} />
            <IconStoryboard count={totalCounts?.totalStoryboards ?? 0} />
          </div>
          <div className="flex flex-col">
            <ViewGlobalScreenshots />
            <IconImageNavigator />
          </div>
          <div className="flex flex-col">
            <IconRecentlyViewed />
            <IconProcessingLog />
          </div>
          <div className="flex flex-col">
            <IconVideos />
            <IconPlaylist />
          </div>
          <div className="flex flex-col">
            <IconTv />
            <PlaylistsPopover />
          </div>
          <div className="flex flex-col">
            <IconSaved count={totalCounts?.totalSaved ?? 0} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <QuickSearch />
          {freeSpace && <Text text={`Free: ${`${freeSpace}GB`}`} />}
          <ThemeSwitcher />
          <Settings />
          <VideoProcessingInfo />
        </div>
      </div>
    </div>
  );
}
