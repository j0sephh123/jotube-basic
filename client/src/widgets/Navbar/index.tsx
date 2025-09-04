import { QuickSearch } from "@widgets/Search";
import {
  ViewGlobalScreenshots,
  VideoProcessingInfo,
  ThemeSwitcher,
} from "@widgets/Navbar";
import Converter from "@widgets/Converter";
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
    <div className="flex flex-col fixed w-full bg-base-100 z-50">
      <div className="navbar shadow-sm flex justify-between items-center w-full">
        <div className="flex gap-2">
          <IconHome />
          <IconVideos />
          <IconPlaylist />
          <IconTv />
          <IconSaved count={totalCounts?.totalSaved ?? 0} />
          <IconThumbnails count={totalCounts?.totalThumbnails ?? 0} />
          <IconImageNavigator />
          <IconRecentlyViewed />
          <ViewGlobalScreenshots />
          <IconProcessingLog />
          <IconStoryboard />
        </div>
        <div className="flex items-center gap-4">
          <QuickSearch />
          <Text text={`Free: ${freeSpace?.freeSpace ?? "..."}`} />
          <ThemeSwitcher />
          <Converter />
          <VideoProcessingInfo />
        </div>
      </div>
    </div>
  );
}
