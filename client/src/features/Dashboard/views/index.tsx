import SavedAndProcessedView from "./SavedAndProcessedView/index";
import NoUploadsOrScreenshotsView from "./NoUploadsOrScreenshotsView/index";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";

export default function Dashboard() {
  const viewType = useTypedViewType();

  if (
    viewType === ViewType.CHANNELS_WITHOUT_UPLOADS ||
    viewType === ViewType.CHANNELS_WITHOUT_SCREENSHOTS ||
    viewType === ViewType.THUMBNAILS
  ) {
    return <NoUploadsOrScreenshotsView />;
  }

  return <SavedAndProcessedView />;
}
