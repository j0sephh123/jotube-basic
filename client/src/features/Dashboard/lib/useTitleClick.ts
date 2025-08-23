import { useNavigate } from "react-router-dom";
import { ViewType } from "./useDashboardParams";
import { routes } from "@shared/routes";

export default function useTitleClick(
  channel: {
    ytId: string;
    title: string;
    src: string;
    lastSyncedAt: string | null;
  },
  viewType: ViewType
) {
  const navigate = useNavigate();

  return (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (viewType === ViewType.NO_UPLOADS) {
      return;
    }

    if (viewType === ViewType.NO_SCREENSHOTS) {
      navigate(routes.channel(channel.ytId));
      return;
    }

    if (viewType === ViewType.PROCESSED) {
      navigate(routes.gallery(channel.ytId));
      return;
    }

    navigate(routes.savedChannel(channel.ytId));
  };
}
