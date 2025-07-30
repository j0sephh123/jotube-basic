import { useNavigate, useParams } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

export default function ViewTypeToggle() {
  const navigate = useNavigate();
  const { viewType } = useParams();

  const currentViewType = viewType;

  const handleToggle = (viewType: "saved" | "processed") => {
    navigate(routes.dashboard(viewType), {
      replace: true,
      state: { viewType, timestamp: Date.now() },
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
      </div>
    </div>
  );
}
