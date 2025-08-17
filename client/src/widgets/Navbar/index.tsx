import { Grid2X2, HomeIcon, ListMusic, Save, SquarePlay } from "lucide-react";
import QuickSearch from "@/features/Search/Search";
import PlayButton from "./InitCarouselButton";
import DropdownMenu from "./DropdownMenu";
import ProcessingProgress from "./ProcessingProgress";
import {
  getCurrentDay,
  getCurrentMonth,
  getLastDay,
  getLastMonth,
} from "@/shared/utils/date";
import VideoProcessingInfo from "./VideoProcessingInfo";
import ThemeSwitcher from "./ThemeSwitcher";
import { routes } from "@/shared/utils/routes";
import { useTotalCounts } from "@/features/Statistics/hooks/useTotalCounts";
import { useFreeSpace } from "@/features/Statistics/hooks/useFreeSpace";
import IconButton from "@/shared/components/icons/IconButton";
import { ViewType } from "@/shared/hooks/useDashboardParams";

export default function Navbar() {
  const { data: totalCounts } = useTotalCounts();
  const { data: freeSpace } = useFreeSpace();

  return (
    <div className="flex flex-col fixed w-full bg-base-100 z-50">
      <div className="navbar shadow-sm flex justify-between items-center w-full">
        <div className="flex gap-2 flex-1 min-w-0">
          <IconButton icon={<HomeIcon />} to={routes.home()} />
          <DropdownMenu
            title="Screenshots"
            items={[
              { name: "This year", link: "screenshots" },
              { name: "This month", link: `screenshots/${getCurrentMonth()}` },
              { name: "Last month", link: `screenshots/${getLastMonth()}` },
              { name: "Yesterday", link: `screenshots/${getLastDay()}` },
              { name: "Today", link: `screenshots/${getCurrentDay()}` },
            ]}
          />
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
            icon={
              <>
                <Save />
                <span className="absolute -top-1 -right-1 text-xs bg-zinc-600 text-white rounded-full px-1 py-0 text-[10px] leading-tight min-w-4 text-center">
                  {totalCounts?.totalSaved ?? 0}
                </span>
              </>
            }
            to={routes.dashboard(ViewType.SAVED)}
            tooltip={{
              content: "Saved",
              position: "bottom",
            }}
          />
          <IconButton
            icon={
              <>
                <Grid2X2 />
                <span className="absolute -top-1 -right-1 text-xs bg-zinc-600 text-white rounded-full px-1 py-0 text-[10px] leading-tight min-w-4 text-center">
                  {totalCounts?.totalThumbnails ?? 0}
                </span>
              </>
            }
            to={routes.dashboard(ViewType.THUMBNAILS)}
            tooltip={{
              content: "Thumbnails",
              position: "bottom",
            }}
          />

          <PlayButton />
        </div>
        <div className="relative flex items-center gap-4 w-80">
          <QuickSearch />
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <span className="font-mono">
              Free: {freeSpace?.freeSpace ?? "..."}
            </span>
          </div>
          <ThemeSwitcher />
          <ProcessingProgress />
          <VideoProcessingInfo />
        </div>
      </div>
    </div>
  );
}
