import SavedAndProcessedView from "./SavedAndProcessedView/index";
import NoUploadsView from "./NoUploadsView/index";
import NoScreenshotsView from "./NoScreenshotsView/index";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";
import ThumbnailsView from "./ThumbnailsView/index";

export default function Dashboard() {
  const viewType = useTypedViewType();

  if (viewType === ViewType.CHANNELS_WITHOUT_UPLOADS) {
    return <NoUploadsView />;
  }

  if (viewType === ViewType.CHANNELS_WITHOUT_SCREENSHOTS) {
    return <NoScreenshotsView />;
  }

  if (viewType === ViewType.THUMBNAILS) {
    return <ThumbnailsView />;
  }

  return <SavedAndProcessedView />;
}
