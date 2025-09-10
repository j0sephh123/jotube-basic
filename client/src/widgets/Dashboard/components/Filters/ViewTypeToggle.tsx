import { useCustomNavigate, useTypedParams } from "@shared/hooks";
import { ViewType } from "@features/Dashboard";
import { DoubleAction } from "@shared/ui";

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
    <div className="flex gap-2">
      {viewTypeOrder.map((type) => (
        <DoubleAction
          key={type}
          label={type}
          count={0}
          onNavigate={() => handleToggle(type)}
          isActive={(viewType as unknown as ViewType) === type}
          size="sm"
        />
      ))}
    </div>
  );
}
