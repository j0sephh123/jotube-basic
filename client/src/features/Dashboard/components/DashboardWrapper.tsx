import React from "react";
import { Outlet } from "react-router-dom";
import ChannelsDashboardHeader from "@/features/Dashboard/components/ChannelsDashboardHeader";
import VideosDashboardHeader from "./VideosDashboardHeader";
import { useDashboardParams } from "@/shared/hooks/useDashboardParams";

const header: Record<"channels" | "videos", React.ComponentType> = {
  channels: ChannelsDashboardHeader,
  videos: VideosDashboardHeader,
};

export default function DashboardWrapper() {
  const { type } = useDashboardParams();

  return (
    <div className="h-screen flex flex-col p-2 mt-16">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        {React.createElement(header[type])}
        <Outlet />
      </div>
    </div>
  );
}
