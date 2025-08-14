import { useNavigate } from "react-router-dom";
import useArtifacts from "@/features/Thumbnail/hooks/useArtifacts";
import { routes } from "@/shared/utils/routes";
import useViewThumbnails from "@/shared/hooks/useViewThumbnails";
import { Fragment } from "react";
import Tooltip from "@/shared/components/Tooltip";

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
          <Tooltip
            content={stat.tooltip}
            position="top"
            color="primary"
            className="cursor-pointer"
          >
            <span
              className={`${stat.color} transition-colors`}
              onClick={stat.onClick}
            >
              {stat.value}
            </span>
          </Tooltip>
          {index < stats.length - 1 && (
            <span className="text-base-content/50">|</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
