import { QuickSearch } from "@widgets/Search";
import {
  ViewGlobalScreenshots,
  Screenshots,
  VideoProcessingInfo,
  ThemeSwitcher,
} from "@widgets/Navbar";
import { useTotalCounts, useFreeSpace } from "@features/Statistics";
import {
  IconHome,
  IconPlaylist,
  IconVideos,
  IconSaved,
  IconThumbnails,
  IconImageNavigator,
  Text,
} from "@shared/ui";

export default function Navbar() {
  const { data: totalCounts } = useTotalCounts();
  const { data: freeSpace } = useFreeSpace();

  return (
    <div className="flex flex-col fixed w-full bg-base-100 z-50">
      <div className="navbar shadow-sm flex justify-between items-center w-full">
        <div className="flex gap-2">
          <IconHome />
          <Screenshots />
          <IconVideos />
          <IconPlaylist />
          <IconSaved count={totalCounts?.totalSaved ?? 0} />
          <IconThumbnails totalThumbnails={totalCounts?.totalThumbnails ?? 0} />
          <IconImageNavigator />
          <ViewGlobalScreenshots />
        </div>
        <div className="flex items-center gap-4">
          <QuickSearch />
          <Text text={`Free: ${freeSpace?.freeSpace ?? "..."}`} />
          <ThemeSwitcher />
          <VideoProcessingInfo />
        </div>
      </div>
    </div>
  );
}
