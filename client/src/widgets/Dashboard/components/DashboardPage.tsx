import ChannelsDashboard from "./ChannelsDashboard";
import { CommonHeader } from "./CommonHeader";
import VideosDashboard from "./VideosDashboard";
import { useParams } from "react-router-dom";

export default function DashboardPage() {
  const params = useParams<{ dashboardType: string }>();

  return (
    <div className="h-screen flex flex-col p-2 pb-14">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        <CommonHeader />
        <div className="flex-1 min-h-0 overflow-y-auto px-4">
          {params.dashboardType === "channels" && <ChannelsDashboard />}
          {params.dashboardType === "videos" && <VideosDashboard />}
        </div>
      </div>
    </div>
  );
}
