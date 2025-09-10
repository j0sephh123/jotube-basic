import { DashboardType, type ViewType } from "@features/Dashboard";
import VideosDashboard from "./VideosDashboard";
import ChannelsDashboard from "./ChannelsDashboard";
import { useTypedParams } from "@shared/hooks";

export default function DashboardWidget() {
  const { type } = useTypedParams("DashboardParams");
  const { viewType } = useTypedParams("DashboardParams");

  console.log({ viewType, type });

  if (type === DashboardType.CHANNELS) {
    return <ChannelsDashboard viewType={viewType as unknown as ViewType} />;
  }

  return <VideosDashboard />;
}
