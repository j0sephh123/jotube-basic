
import DashboardMain from "./DashboardMain";
import ChannelsWithoutUploads from "./ChannelsWithoutUploads";
import ChannelsWithoutScreenshots from "./ChannelsWithoutScreenshots";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";

export default function Dashboard() {
  const viewType = useTypedViewType();

  if (viewType === ViewType.CHANNELS_WITHOUT_UPLOADS) {
    return <ChannelsWithoutUploads />;
  }

  if (viewType === ViewType.CHANNELS_WITHOUT_SCREENSHOTS) {
    return <ChannelsWithoutScreenshots />;
  }

  return <DashboardMain />;
}
