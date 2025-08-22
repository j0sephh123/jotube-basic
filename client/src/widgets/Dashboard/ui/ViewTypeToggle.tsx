import { useNavigate } from "react-router-dom";
import { routes } from "@shared/routes";
import { useDashboardParams, ViewType } from "@features/Dashboard";
import clsx from "clsx";
import { Button } from "@shared/ui";

const viewTypeOrder = [
  ViewType.NO_UPLOADS,
  ViewType.NO_SCREENSHOTS,
  ViewType.SAVED,
  ViewType.THUMBNAILS,
  ViewType.PROCESSED,
  ViewType.HAS_STORYBOARDS,
];

export default function ViewTypeToggle() {
  const navigate = useNavigate();
  const { viewType } = useDashboardParams();

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
        {viewTypeOrder.map((type) => (
          <Button
            key={type}
            className={clsx("join-item", {
              "btn-primary": viewType === type,
              "btn-outline": viewType !== type,
            })}
            onClick={() => handleToggle(type)}
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
}
