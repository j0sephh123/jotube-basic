import { useNavigate } from "react-router-dom";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";
import { routes } from "@/shared/utils/routes";
import useViewThumbnails from "@/shared/hooks/useViewThumbnails";
import { Fragment } from "react";

type CardStatsProps = {
  ytId: string;
  id: number;
  screenshotsCount: number;
  thumbnails: number;
  saved: number;
  defaults: number;
  storyboard: number;
};

export default function CardStats({
  ytId,
  id,
  screenshotsCount,
  thumbnails,
  saved,
  defaults,
  storyboard,
}: CardStatsProps) {
  const { getScreenshots } = useArtifacts();
  const navigate = useNavigate();
  const handleThumbnailClick = useViewThumbnails(id);

  const stats = [
    {
      value: defaults,
      tooltip: "Default videos",
      color: "text-yellow-400",
      onClick: () => navigate(routes.channel(ytId)),
    },
    {
      value: saved,
      tooltip: "Saved videos",
      color: "text-blue-400",
      onClick: () => navigate(routes.savedChannel(ytId)),
    },
    {
      value: screenshotsCount,
      tooltip: "Screenshots",
      color: "text-purple-400 hover:text-purple-300",
      onClick: () => getScreenshots([ytId]),
    },
    {
      value: thumbnails,
      tooltip: "Thumbnails",
      color: "text-green-400 hover:text-green-300",
      onClick: () => handleThumbnailClick(),
    },
    {
      value: storyboard,
      tooltip: "Storyboard",
      color: "text-red-400 hover:text-red-300",
      onClick: () => navigate(routes.storyboard(ytId)),
    },
  ];

  return (
    <div className="flex items-center justify-between gap-1">
      {stats.map((stat, index) => (
        <Fragment key={stat.tooltip}>
          <div
            className="tooltip tooltip-top tooltip-primary cursor-pointer"
            data-tip={stat.tooltip}
            onClick={stat.onClick}
          >
            <span className={`${stat.color} transition-colors`}>
              {stat.value}
            </span>
          </div>
          {index < stats.length - 1 && <span className="text-gray-500">|</span>}
        </Fragment>
      ))}
    </div>
  );
}
