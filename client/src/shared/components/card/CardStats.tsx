import { useNavigate } from "react-router-dom";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";
import { routes } from "@/shared/utils/routes";
import useViewThumbnails from "@/shared/hooks/useViewThumbnails";

type CardStatsProps = {
  ytId: string;
  id: number;
  screenshotsCount?: number;
  thumbnails: number;
  saved?: number;
  defaults?: number;
};

export default function CardStats({
  ytId,
  id,
  screenshotsCount,
  thumbnails,
  saved,
  defaults,
}: CardStatsProps) {
  const { getScreenshots } = useArtifacts();
  const navigate = useNavigate();
  const handleThumbnailClick = useViewThumbnails(id);

  const handleScreenshotsClick = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) return;
    getScreenshots([ytId]);
  };

  const handleThumbnailsClick = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) return;
    handleThumbnailClick()
  };

  const handleSavedClick = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) return;
    navigate(routes.savedChannel(ytId));
  };

  const handleDefaultsClick = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) return;
    navigate(routes.channel(ytId));
  };

  return (
    <div className="flex items-center justify-between gap-1">
      <div
        className="tooltip tooltip-top tooltip-primary cursor-pointer"
        data-tip="Screenshots"
        onClick={handleScreenshotsClick}
      >
        <span className="text-purple-400 hover:text-purple-300 transition-colors">
          {screenshotsCount || 0}
        </span>
      </div>
      <span className="text-gray-500">|</span>
      <div
        className="tooltip tooltip-top tooltip-primary cursor-pointer"
        data-tip="Thumbnails"
        onClick={handleThumbnailsClick}
      >
        <span className="text-green-400 hover:text-green-300 transition-colors">
          {thumbnails}
        </span>
      </div>
      <span className="text-gray-500">|</span>
      <div
        className="tooltip tooltip-top tooltip-primary cursor-pointer"
        data-tip="Saved videos"
        onClick={handleSavedClick}
      >
        <span className="text-blue-400">{saved || 0}</span>
      </div>
      <span className="text-gray-500">|</span>
      <div
        className="tooltip tooltip-top tooltip-primary cursor-pointer"
        data-tip="Default videos"
        onClick={handleDefaultsClick}
      >
        <span className="text-yellow-400">{defaults || 0}</span>
      </div>
    </div>
  );
}
