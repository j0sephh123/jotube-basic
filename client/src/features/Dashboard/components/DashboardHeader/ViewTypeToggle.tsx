import { useNavigate, useParams } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

export default function ViewTypeToggle() {
  const navigate = useNavigate();
  const { viewType } = useParams();

  const handleToggle = (newViewType: "saved" | "processed" | "channels-without-uploads" | "channels-without-screenshots") => {
    navigate(routes.dashboard(newViewType), {
      replace: true,
      state: { viewType: newViewType, timestamp: Date.now() },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">View:</span>
      <div className="join">
        <button
          className={`join-item btn btn-sm ${
            viewType === "saved" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleToggle("saved")}
        >
          Saved
        </button>
        <button
          className={`join-item btn btn-sm ${
            viewType === "processed" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleToggle("processed")}
        >
          Processed
        </button>
        <button
          className={`join-item btn btn-sm ${
            viewType === "channels-without-uploads" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleToggle("channels-without-uploads")}
        >
          New Channels
        </button>
        <button
          className={`join-item btn btn-sm ${
            viewType === "channels-without-screenshots" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleToggle("channels-without-screenshots")}
        >
          No Screenshots
        </button>
      </div>
    </div>
  );
}
