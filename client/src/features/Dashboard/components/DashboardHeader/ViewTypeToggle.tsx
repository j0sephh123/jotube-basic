import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/utils/routes";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";
import clsx from "clsx";

const VIEW_TYPE_CONFIG = [
  { type: ViewType.SAVED, label: "Saved" },
  { type: ViewType.PROCESSED, label: "Processed" },
  { type: ViewType.CHANNELS_WITHOUT_UPLOADS, label: "New Channels" },
  { type: ViewType.CHANNELS_WITHOUT_SCREENSHOTS, label: "No Screenshots" },
] as const;

export default function ViewTypeToggle() {
  const navigate = useNavigate();
  const viewType = useTypedViewType();

  const handleToggle = (newViewType: ViewType) => {
    navigate(routes.dashboard(newViewType), {
      replace: true,
      state: { viewType: newViewType, timestamp: Date.now() },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">View:</span>
      <div className="join">
        {VIEW_TYPE_CONFIG.map(({ type, label }) => (
          <button
            key={type}
            className={clsx("join-item btn btn-sm", {
              "btn-primary": viewType === type,
              "btn-outline": viewType !== type,
            })}
            onClick={() => handleToggle(type)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
