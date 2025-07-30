import { useParams } from "react-router-dom";
import DashboardMain from "./DashboardMain";
import ChannelsWithoutUploads from "./ChannelsWithoutUploads";
import ChannelsWithoutScreenshots from "./ChannelsWithoutScreenshots";

export default function Dashboard() {
  // TODO: extract as a separate hook so we can add types to it
  const { viewType } = useParams();

  if (viewType === "channels-without-uploads") {
    return <ChannelsWithoutUploads />;
  }

  if (viewType === "channels-without-screenshots") {
    return <ChannelsWithoutScreenshots />;
  }

  return <DashboardMain />;
}
