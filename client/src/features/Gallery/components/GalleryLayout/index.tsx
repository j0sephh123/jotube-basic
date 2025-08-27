import { Outlet } from "react-router-dom";
import { VideosWithScreenshotsAmountList } from "@features/Gallery";

export default function GalleryLayout() {
  return (
    <div className="flex h-screen">
      <VideosWithScreenshotsAmountList />
      <div className="flex-1 flex-col h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
