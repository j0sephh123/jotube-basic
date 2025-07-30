import { useNavigate, useParams, useLocation } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

export default function ViewTypeToggle() {
  const navigate = useNavigate();
  const { viewType } = useParams();
  const location = useLocation();

  const currentViewType = viewType;
  const isChannelsWithoutUploads = location.pathname === routes.newChannels();
  const isChannelsWithoutScreenshots =
    location.pathname === routes.channelsWithoutScreenshots();

  const handleToggle = (viewType: "saved" | "processed") => {
    navigate(routes.dashboard(viewType), {
      replace: true,
      state: { viewType, timestamp: Date.now() },
    });
  };

  const handleChannelsWithoutUploads = () => {
    navigate(routes.newChannels(), {
      replace: true,
      state: { viewType: "channels-without-uploads", timestamp: Date.now() },
    });
  };

  const handleChannelsWithoutScreenshots = () => {
    navigate(routes.channelsWithoutScreenshots(), {
      replace: true,
      state: {
        viewType: "channels-without-screenshots",
        timestamp: Date.now(),
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">View:</span>
      <div className="join">
        <button
          className={`join-item btn btn-sm ${
            currentViewType === "saved" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleToggle("saved")}
        >
          Saved
        </button>
        <button
          className={`join-item btn btn-sm ${
            currentViewType === "processed" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleToggle("processed")}
        >
          Processed
        </button>
        <button
          className={`join-item btn btn-sm ${
            isChannelsWithoutUploads ? "btn-primary" : "btn-outline"
          }`}
          onClick={handleChannelsWithoutUploads}
        >
          New Channels
        </button>
        <button
          className={`join-item btn btn-sm ${
            isChannelsWithoutScreenshots ? "btn-primary" : "btn-outline"
          }`}
          onClick={handleChannelsWithoutScreenshots}
        >
          No Screenshots
        </button>
      </div>
    </div>
  );
}
