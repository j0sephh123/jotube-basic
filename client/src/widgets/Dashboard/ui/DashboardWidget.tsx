import { DashboardType } from "@features/Dashboard";
import VideosDashboard from "./VideosDashboard";
import ChannelsDashboard from "./ChannelsDashboard";
import { useTypedParams } from "@shared/hooks";

export default function DashboardWidget() {
  const { type } = useTypedParams("DashboardParams");

  if (type === DashboardType.CHANNELS) {
    return <ChannelsDashboard />;
  }

  return <VideosDashboard />;
}
