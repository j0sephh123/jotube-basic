import ChannelsDashboard from "./ChannelsDashboard";
import { CommonHeader } from "./CommonHeader";
import VideosDashboard from "./VideosDashboard";
import { useParams } from "react-router-dom";
import { PlaylistsDashboard } from "./PlaylistsDashboard";

export default function DashboardPage() {
  const { dashboardType } = useParams<{
    dashboardType: string;
  }>();

  return (
    <div className="h-full flex flex-col p-2">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        <CommonHeader />
        <div className="flex-1 min-h-0 px-4 pb-20">
          {dashboardType === "channels" && <ChannelsDashboard />}
          {dashboardType === "videos" && <VideosDashboard />}
          {dashboardType === "playlists" && <PlaylistsDashboard />}
        </div>
      </div>
    </div>
  );
}
