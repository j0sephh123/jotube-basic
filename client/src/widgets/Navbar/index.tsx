import { Grid2X2, HomeIcon, ListMusic, Save, SquarePlay } from "lucide-react";
import QuickSearch from "@features/Search/Search";
import InitCarouselButton from "@widgets/Navbar/InitCarouselButton";
import Screenshots from "@widgets/Navbar/Screenshots";
import VideoProcessingInfo from "@widgets/Navbar/VideoProcessingInfo";
import ThemeSwitcher from "@widgets/Navbar/ThemeSwitcher";
import { routes } from "@/shared/routes";
import { useTotalCounts } from "@features/Statistics/hooks/useTotalCounts";
import { useFreeSpace } from "@features/Statistics/hooks/useFreeSpace";
import IconButton from "@shared/ui/icons/IconButton";
import { ViewType } from "@widgets/Dashboard/lib/useDashboardParams";
import Text from "@shared/ui/Text";

export default function Navbar() {
  const { data: totalCounts } = useTotalCounts();
  const { data: freeSpace } = useFreeSpace();

  return (
    <div className="flex flex-col fixed w-full bg-base-100 z-50">
      <div className="navbar shadow-sm flex justify-between items-center w-full">
        <div className="flex gap-2">
          <IconButton icon={<HomeIcon />} to={routes.home()} />
          <Screenshots />
          <IconButton
            icon={<SquarePlay />}
            to={routes.videos()}
            tooltip={{
              content: "Videos",
              position: "bottom",
            }}
          />
          <IconButton
            icon={<ListMusic />}
            to={routes.playlists()}
            tooltip={{
              content: "Playlists",
              position: "bottom",
            }}
          />
          <IconButton
            icon={<Save />}
            to={routes.dashboard(ViewType.SAVED)}
            tip={totalCounts?.totalSaved ?? 0}
            tooltip={{
              content: "Saved",
              position: "bottom",
            }}
          />
          <IconButton
            icon={<Grid2X2 />}
            tip={totalCounts?.totalThumbnails ?? 0}
            to={routes.dashboard(ViewType.THUMBNAILS)}
            tooltip={{
              content: "Thumbnails",
              position: "bottom",
            }}
          />
          <InitCarouselButton />
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
