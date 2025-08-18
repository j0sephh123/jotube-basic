import {
  useDashboardParams,
  DashboardType,
} from "@widgets/Dashboard/lib/useDashboardParams";
import VideosDashboard from "@/widgets/Dashboard/ui/VideosDashboard";
import ChannelsDashboard from "@/widgets/Dashboard/ui/ChannelsDashboard";
import { useStore } from "@/store/store";
import { useEffect } from "react";

export default function Dashboard() {
  const { type, viewType } = useDashboardParams();
  const { setRequestBody } = useStore();

  useEffect(() => {
    if (viewType) {
      setRequestBody("viewType", viewType);
    }
  }, [viewType, setRequestBody]);

  if (type === DashboardType.CHANNELS) {
    return <ChannelsDashboard />;
  }

  return <VideosDashboard />;
}
