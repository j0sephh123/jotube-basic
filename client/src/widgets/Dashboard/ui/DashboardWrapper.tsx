import React from "react";
import { Outlet } from "react-router-dom";
import {
  ChannelsHeader,
  SelectSortDirection,
  VideosHeader,
  ViewTypeToggle,
} from "@widgets/Dashboard";
import { DashboardType } from "@features/Dashboard";
import { useDashboardParams } from "@features/Dashboard";

const header: Record<
  DashboardType,
  React.ComponentType<{ leftSlot: React.ReactNode }>
> = {
  channels: ChannelsHeader,
  videos: VideosHeader,
};

export default function DashboardWrapper() {
  const { type } = useDashboardParams();

  const Header = header[type];

  return (
    <div className="h-screen flex flex-col p-2 mt-16 pb-14">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Header
            leftSlot={
              <div className="flex items-center gap-2">
                <SelectSortDirection />
                {type === DashboardType.CHANNELS && <ViewTypeToggle />}
              </div>
            }
          />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-4">
          {type === "channels" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
              <Outlet />
            </div>
          )}
          {type === "videos" && <Outlet />}
        </div>
      </div>
    </div>
  );
}
