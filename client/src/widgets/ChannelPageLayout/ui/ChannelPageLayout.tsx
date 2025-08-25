import { Outlet, useLocation } from "react-router-dom";
import { ChannelHeader } from "@widgets/ChannelHeader";
import clsx from "clsx";

export default function ChannelPageLayout() {
  const location = useLocation();

  const isNewGallery = location.pathname.includes("new-gallery");
  const isGallery = location.pathname.includes("gallery");

  return (
    <div className="container mx-auto px-4 py-2">
      <ChannelHeader
        openPlaylistModal={() => {}}
        onResetRangeFilters={() => {}}
      />
      <div className="overflow-hidden">
        <div className="flex h-[85vh]">
          <div className="flex-1 overflow-y-auto">
            <div
              className={clsx(
                !isNewGallery && !isGallery &&
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2"
              )}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
