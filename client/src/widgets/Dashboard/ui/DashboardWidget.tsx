import { DashboardType, useDashboardStore } from "@features/Dashboard";
import VideosDashboard from "./VideosDashboard";
import ChannelsDashboard from "./ChannelsDashboard";

export default function DashboardWidget() {
  const { type } = useDashboardStore();

  if (type === DashboardType.CHANNELS) {
    return <ChannelsDashboard />;
  }

  return <VideosDashboard />;
}
