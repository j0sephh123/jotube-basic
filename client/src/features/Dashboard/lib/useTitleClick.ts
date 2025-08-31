import { useCustomNavigate } from "@shared/hooks";
import { ViewType } from "./useDashboardParams";
import { makeYtChannelId } from "@shared/types";

export default function useTitleClick(
  channel: {
    ytId: string;
    title: string;
    src: string;
    lastSyncedAt: string | null;
  },
  viewType: ViewType
) {
  const navigate = useCustomNavigate();

  return (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (viewType === ViewType.NO_UPLOADS) {
      return;
    }

    if (viewType === ViewType.NO_SCREENSHOTS) {
      navigate(`/channels/${makeYtChannelId(channel.ytId)}`);
      return;
    }

    if (viewType === ViewType.PROCESSED) {
      navigate(`/channels/${makeYtChannelId(channel.ytId)}/gallery`);
      return;
    }

    navigate(`/channels/${makeYtChannelId(channel.ytId)}/saved`);
  };
}
