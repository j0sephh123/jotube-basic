import SavedAndProcessedView from "./SavedAndProcessedView/index";
import NoUploadsOrScreenshotsView from "./NoUploadsOrScreenshotsView/index";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";
import ThumbnailsView from "./ThumbnailsView/index";

export default function Dashboard() {
  const viewType = useTypedViewType();

  if (
    viewType === ViewType.CHANNELS_WITHOUT_UPLOADS ||
    viewType === ViewType.CHANNELS_WITHOUT_SCREENSHOTS
  ) {
    return <NoUploadsOrScreenshotsView />;
  }

  if (viewType === ViewType.THUMBNAILS) {
    return <ThumbnailsView />;
  }

  return <SavedAndProcessedView />;
}
