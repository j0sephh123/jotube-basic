import {
  Grid2X2,
  HomeIcon,
  ListMusic,
  Save,
  SquarePlay,
  Image,
} from "lucide-react";
import { QuickSearch } from "@widgets/Search";
import {
  InitCarouselButton,
  Screenshots,
  VideoProcessingInfo,
  ThemeSwitcher,
} from "@widgets/Navbar";
import { routes } from "@shared/routes";
import { useTotalCounts, useFreeSpace } from "@features/Statistics";
import { IconButton, Text } from "@shared/ui";
import { ViewType } from "@shared/api";

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
              color: "primary",
            }}
          />
          <IconButton
            icon={<ListMusic />}
            to={routes.playlists()}
            tooltip={{
              content: "Playlists",
              position: "bottom",
              color: "primary",
            }}
          />
          <IconButton
            icon={<Save />}
            to={routes.dashboard(ViewType.Saved)}
            tip={totalCounts?.totalSaved ?? 0}
            tooltip={{
              content: "Saved",
              position: "bottom",
              color: "primary",
            }}
          />
          <IconButton
            icon={<Grid2X2 />}
            tip={totalCounts?.totalThumbnails ?? 0}
            to={routes.dashboard(ViewType.Thumbnails)}
            tooltip={{
              content: "Thumbnails",
              position: "bottom",
              color: "primary",
            }}
          />
          <IconButton
            icon={<Image />}
            to={routes.imageNavigator()}
            tooltip={{
              content: "Image Navigator",
              position: "bottom",
              color: "primary",
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
