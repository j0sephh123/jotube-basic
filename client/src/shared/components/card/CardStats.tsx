import { useNavigate } from "react-router-dom";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";
import { routes } from "@/shared/utils/routes";

type CardStatsProps = {
  ytId: string;
  screenshotsCount?: number;
  thumbnails: number;
  saved?: number;
  defaults?: number;
};

export default function CardStats({
  ytId,
  screenshotsCount,
  thumbnails,
  saved,
  defaults,
}: CardStatsProps) {
  const { getScreenshots } = useArtifacts();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-1">
      <div
        className="tooltip tooltip-top tooltip-primary cursor-pointer"
        data-tip="Screenshots"
        onClick={(event) => {
          if (event.ctrlKey || event.metaKey) return;
          getScreenshots([ytId]);
        }}
      >
        <span className="text-purple-400 hover:text-purple-300 transition-colors">
          {screenshotsCount || 0}
        </span>
      </div>
      <span className="text-gray-500">|</span>
      <div
        className="tooltip tooltip-top tooltip-primary cursor-pointer"
        data-tip="Thumbnails"
        onClick={(event) => {
          if (event.ctrlKey || event.metaKey) return;
          navigate(routes.gallery(ytId));
        }}
      >
        <span className="text-green-400 hover:text-green-300 transition-colors">
          {thumbnails}
        </span>
      </div>
      <span className="text-gray-500">|</span>
      <div
        className="tooltip tooltip-top tooltip-primary"
        data-tip="Saved videos"
      >
        <span className="text-blue-400">{saved || 0}</span>
      </div>
      <span className="text-gray-500">|</span>
      <div
        className="tooltip tooltip-top tooltip-primary"
        data-tip="Default videos"
      >
        <span className="text-yellow-400">{defaults || 0}</span>
      </div>
      <span className="text-gray-500">|</span>
    </div>
  );
}
