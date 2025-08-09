import { HomeIcon } from "lucide-react";
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
import { Link } from "react-router-dom";
import VideoProcessingInfo from "./VideoProcessingInfo";
import ThemeSwitcher from "./ThemeSwitcher";
import { routes } from "@/shared/utils/routes";

export default function Navbar(): JSX.Element {
  return (
    <div className="flex flex-col fixed w-full bg-base-100 z-50">
      <div className="navbar shadow-sm flex justify-between items-center w-full">
        <div className="flex gap-2 flex-1 min-w-0">
          <Link to={routes.home()} className="btn btn-ghost text-xl">
            <HomeIcon />
          </Link>
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
          <Link to={routes.videos()} className="btn btn-ghost">
            Videos
          </Link>
          <PlayButton />
        </div>
        <div className="relative flex items-center gap-4 w-80">
          <QuickSearch />
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <ThemeSwitcher />
          <ProcessingProgress />
          <VideoProcessingInfo />
        </div>
      </div>
    </div>
  );
}
