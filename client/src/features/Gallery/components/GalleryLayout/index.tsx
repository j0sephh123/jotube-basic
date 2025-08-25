import { Outlet } from "react-router-dom";
import { SidePanel } from "@features/Gallery";

export default function GalleryLayout() {
  return (
    <div className="flex h-screen">
      <SidePanel />
      <div className="flex-1 flex-col h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
