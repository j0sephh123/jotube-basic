import { DoubleAction } from "@shared/ui";
import { useCustomNavigate } from "@shared/hooks";
import { type To } from "@shared/types";
import { useParams } from "react-router-dom";

const viewTypeOrder = ["screenshots", "saved", "storyboards", "thumbnails"];

export function VideosDashboardViewTypeToggle() {
  const navigate = useCustomNavigate();
  const { videosDashboardViewType } = useParams<{
    videosDashboardViewType: string;
  }>();

  const handleToggle = (newViewType: string) => {
    navigate(`/dashboard/videos/${newViewType}` as To);
  };

  return (
    <div className="flex gap-2">
      {viewTypeOrder.map((type) => (
        <DoubleAction
          key={type}
          label={type}
          count={0}
          onNavigate={() => handleToggle(type)}
          isActive={videosDashboardViewType === type}
          size="sm"
        />
      ))}
    </div>
  );
}
