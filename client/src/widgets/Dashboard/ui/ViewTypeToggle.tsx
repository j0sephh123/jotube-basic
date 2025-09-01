import { useCustomNavigate, useTypedParams } from "@shared/hooks";
import { ViewType } from "@features/Dashboard";
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
  const navigate = useCustomNavigate();
  const { viewType } = useTypedParams("DashboardParams");

  const handleToggle = (newViewType: ViewType) => {
    navigate(`/dashboard/channels/${newViewType}`);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {viewTypeOrder.map((type) => (
        <Button
          size="sm"
          key={type}
          className={clsx("", {
            "btn-primary": (viewType as unknown as ViewType) === type,
            "btn-outline": (viewType as unknown as ViewType) !== type,
          })}
          onClick={() => handleToggle(type)}
        >
          {type}
        </Button>
      ))}
    </div>
  );
}
