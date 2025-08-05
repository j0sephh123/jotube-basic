import SavedAndProcessedView from "./SavedAndProcessedView";
import NoUploadsView from "./NoUploadsView";
import NoScreenshotsView from "./NoScreenshotsView";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";
import ThumbnailsView from "./ThumbnailsView";

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
