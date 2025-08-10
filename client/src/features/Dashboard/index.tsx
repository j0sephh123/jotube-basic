import { useDashboardParams } from "@/shared/hooks/useDashboardParams";
import VideosDashboard from "./components/VideosDashboard";
import { DashboardType } from "@/shared/hooks/useDashboardParams";
import ChannelsDashboard from "./components/ChannelsDashboard";

export default function Dashboard() {
  const { type } = useDashboardParams();

  console.log({
    type,
  });

  if (type === DashboardType.CHANNELS) {
    return <ChannelsDashboard />;
  }

  return <VideosDashboard />;
}
