import React from "react";
import { Outlet } from "react-router-dom";
import ChannelsHeader from "@/widgets/Dashboard/ui/ChannelsHeader";
import VideosHeader from "@/widgets/Dashboard/ui/VideosHeader";
import {
  DashboardType,
  useDashboardParams,
} from "@/features/Dashboard/lib/useDashboardParams";

const header: Record<DashboardType, React.ComponentType> = {
  channels: ChannelsHeader,
  videos: VideosHeader,
};

export default function DashboardWrapper() {
  const { type } = useDashboardParams();

  return (
    <div className="h-screen flex flex-col p-2 mt-16 pb-14">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        {React.createElement(header[type])}
        <div className="flex-1 min-h-0 overflow-y-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
