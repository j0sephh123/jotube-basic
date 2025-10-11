import ChannelsDashboard from "./ChannelsDashboard";
import { CommonHeader } from "./CommonHeader";
import VideosDashboard from "./VideosDashboard";
import { useParams } from "react-router-dom";
import { PlaylistsDashboard } from "./PlaylistsDashboard";
import { TvDashboard } from "./TvDashboard";

export default function DashboardPage() {
  const { dashboardType } = useParams<{
    dashboardType: string;
  }>();

  return (
    <div className="h-full flex flex-col p-2">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        <CommonHeader />
        <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-20">
          {dashboardType === "channels" && <ChannelsDashboard />}
          {dashboardType === "videos" && <VideosDashboard />}
          {dashboardType === "playlists" && <PlaylistsDashboard />}
          {dashboardType === "tv" && <TvDashboard />}
        </div>
      </div>
    </div>
  );
}
