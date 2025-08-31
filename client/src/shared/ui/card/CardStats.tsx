import { Fragment } from "react";
import { Tooltip } from "@shared/ui";
import { routes } from "@shared/routes";

type CardStatsProps = {
  ytId: string;
  id: number;
  screenshotsCount: number;
  thumbnails: number;
  saved: number;
  defaults: number;
  storyboard: number;
  onNavigate: (route: string) => void;
  onViewScreenshots: (ytIds: string[]) => void;
  onViewThumbnails: () => void;
  onViewStoryboards: () => void;
};

export default function CardStats({
  ytId,
  screenshotsCount,
  thumbnails,
  saved,
  defaults,
  storyboard,
  onNavigate,
  onViewScreenshots,
  onViewThumbnails,
  onViewStoryboards,
}: CardStatsProps) {
  const stats = [
    {
      value: defaults,
      tooltip: "Default videos",
      color: "text-yellow-400",
      onClick: () => onNavigate(routes.channel(ytId)),
    },
    {
      value: saved,
      tooltip: "Saved videos",
      color: "text-blue-400",
      onClick: () => onNavigate(routes.savedChannel(ytId)),
    },
    {
      value: screenshotsCount,
      tooltip: "Screenshots",
      color: "text-purple-400 hover:text-purple-300",
      onClick: () => onViewScreenshots([ytId]),
    },
    {
      value: thumbnails,
      tooltip: "Thumbnails",
      color: "text-green-400 hover:text-green-300",
      onClick: () => onViewThumbnails(),
    },
    {
      value: storyboard,
      tooltip: "Storyboard",
      color: "text-red-400 hover:text-red-300",
      onClick: () => onViewStoryboards(),
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
