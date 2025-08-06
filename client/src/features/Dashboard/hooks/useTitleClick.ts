import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/utils/routes";
import { ViewType } from "@/shared/hooks/useTypedParams";
import useViewThumbnails from "@/shared/hooks/useViewThumbnails";
import { DashboardChannel } from "../types";

export default function useTitleClick(
  channel: DashboardChannel,
  viewType: ViewType
) {
  const navigate = useNavigate();

  const handleThumbnailClick = useViewThumbnails(channel.id);

  const handleChannelTitleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (viewType === ViewType.NO_UPLOADS) {
      return;
    }

    if (viewType === ViewType.NO_SCREENSHOTS) {
      navigate(routes.channel(channel.ytId));
      return;
    }

    if (viewType === ViewType.THUMBNAILS) {
      handleThumbnailClick();
      return;
    }

    if (viewType === ViewType.PROCESSED) {
      navigate(routes.gallery(channel.ytId));
      return;
    }

    navigate(routes.savedChannel(channel.ytId));
  };

  return handleChannelTitleClick;
}
