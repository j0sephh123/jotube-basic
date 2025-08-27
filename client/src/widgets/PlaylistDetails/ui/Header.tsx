import type { PlaylistDetailsResponse } from "@shared/api";
import { routes } from "@shared/routes";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type HeaderProps = {
  playlist: PlaylistDetailsResponse;
};

export default function Header({ playlist }: HeaderProps) {
  const totalCounts = playlist.channels.reduce(
    (acc, channel) => ({
      videoCount: acc.videoCount + channel.videoCount,
      savedCount: acc.savedCount + channel.savedCount,
      screenshotCount: acc.screenshotCount + channel.screenshotCount,
      thumbnailCount: acc.thumbnailCount + channel.thumbnailCount,
    }),
    {
      videoCount: 0,
      savedCount: 0,
      screenshotCount: 0,
      thumbnailCount: 0,
    }
  );

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Link
          to={routes.playlists()}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{playlist.name}</h1>
          <p className="text-base-content/60">
            {playlist.channels.length} channels
          </p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="flex gap-4">
          <SmallCard
            title="Total Videos"
            value={totalCounts.videoCount}
            className="text-primary"
            wrapperClassName="bg-primary/10"
          />
          <SmallCard
            title="Saved Videos"
            value={totalCounts.savedCount}
            className="text-success"
            wrapperClassName="bg-success/10"
          />
          <SmallCard
            title="Screenshots"
            value={totalCounts.screenshotCount}
            className="text-warning"
            wrapperClassName="bg-warning/10"
          />
          <SmallCard
            title="Thumbnails"
            value={totalCounts.thumbnailCount}
            className="text-info"
            wrapperClassName="bg-info/10"
          />
        </div>
      </div>
    </div>
  );
}

function SmallCard({
  title,
  value,
  className,
  wrapperClassName,
}: {
  title: string;
  value: number;
  className: string;
  wrapperClassName: string;
}) {
  return (
    <div
      className={clsx(
        "stat bg-primary/10 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-base-100 hover:shadow-lg",
        wrapperClassName
      )}
    >
      <div className={clsx("stat-title", className)}>{title}</div>
      <div className={clsx("stat-value text-2xl", className)}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}
