import { useNavigate } from "react-router-dom";

// Local enum to avoid internal module imports
enum LocalViewType {
  NO_UPLOADS = "no-uploads",
  NO_SCREENSHOTS = "no-screenshots",
  PROCESSED = "processed",
}

// Local routes to avoid shared dependency
const localRoutes = {
  channel: (ytId: string) => `/channels/${ytId}`,
  gallery: (ytId: string) => `/gallery/${ytId}`,
  savedChannel: (ytId: string) => `/saved/${ytId}`,
};

export default function useTitleClick(
  channel: {
    ytId: string;
    title: string;
    src: string;
    lastSyncedAt: string | null;
  },
  viewType: LocalViewType
) {
  const navigate = useNavigate();

  return (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (viewType === LocalViewType.NO_UPLOADS) {
      return;
    }

    if (viewType === LocalViewType.NO_SCREENSHOTS) {
      navigate(localRoutes.channel(channel.ytId));
      return;
    }

    if (viewType === LocalViewType.PROCESSED) {
      navigate(localRoutes.gallery(channel.ytId));
      return;
    }

    navigate(localRoutes.savedChannel(channel.ytId));
  };
}
