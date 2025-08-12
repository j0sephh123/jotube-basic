import { useDashboardParams } from "@/shared/hooks/useDashboardParams";
import VideosDashboard from "./components/VideosDashboard";
import { DashboardType } from "@/shared/hooks/useDashboardParams";
import ChannelsDashboard from "./components/ChannelsDashboard";
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

  console.log({
    type,
    viewType,
  });

  if (type === DashboardType.CHANNELS) {
    return <ChannelsDashboard />;
  }

  return <VideosDashboard />;
}
