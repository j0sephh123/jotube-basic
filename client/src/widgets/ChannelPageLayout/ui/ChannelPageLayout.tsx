import { Outlet } from "react-router-dom";
import { ChannelHeader } from "@widgets/ChannelHeader";

export default function ChannelPageLayout() {
  return (
    <div className="container mx-auto px-4 py-2">
      <ChannelHeader
        openPlaylistModal={() => {}}
        onResetRangeFilters={() => {}}
      />
      <div className="overflow-hidden">
        <div className="flex h-[70vh]">
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
