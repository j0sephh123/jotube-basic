import type { PlaylistDetailsResponse } from "@shared/api";
import { routes } from "@shared/routes";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SmallCard } from "./SmallCard";

type HeaderProps = {
  playlist: PlaylistDetailsResponse;
};

export default function Header({
  playlist: { id, name, channels },
}: HeaderProps) {
  const totalCounts = channels.reduce(
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

  const navigate = useNavigate();

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
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-base-content/60">{channels.length} channels</p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="flex gap-4">
          <SmallCard
            onClick={() => navigate(`/playlists/${id}/uploads/default`)}
            title="Total Videos"
            value={totalCounts.videoCount}
            className="text-primary"
            wrapperClassName="bg-primary/10"
          />
          <SmallCard
            onClick={() => navigate(`/playlists/${id}/uploads/saved`)}
            title="Saved Videos"
            value={totalCounts.savedCount}
            className="text-success"
            wrapperClassName="bg-success/10"
          />
          <SmallCard
            onClick={() => undefined}
            title="Screenshots"
            value={totalCounts.screenshotCount}
            className="text-warning"
            wrapperClassName="bg-warning/10"
          />
          <SmallCard
            onClick={() => undefined}
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
