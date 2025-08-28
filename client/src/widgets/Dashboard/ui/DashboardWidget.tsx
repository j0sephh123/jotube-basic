import { DashboardType } from "@features/Dashboard";
import VideosDashboard from "./VideosDashboard";
import ChannelsDashboard from "./ChannelsDashboard";
import { useParams } from "react-router-dom";

export default function DashboardWidget() {
  const { type } = useParams<{ type: DashboardType }>();

  if (type === DashboardType.CHANNELS) {
    return <ChannelsDashboard />;
  }

  return <VideosDashboard />;
}
