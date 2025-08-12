import { Link } from "react-router-dom";
import { Playlist } from "../types";
import InfoCard from "@/shared/components/InfoCard";

interface PlaylistCardProps {
  playlist: Playlist;
}

export const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  return (
    <div className="relative">
      <InfoCard
        title={playlist.name}
        content={
          <div className="space-y-2">
            <p className="text-sm text-base-content/70">
              {playlist.channels?.length || 0} channel
              {(playlist.channels?.length || 0) !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-base-content/60">
              Created{" "}
              {playlist.createdAt
                ? new Date(playlist.createdAt).toLocaleDateString()
                : "Unknown date"}
            </p>
            <div className="flex justify-end mt-4">
              <Link
                to={`/playlists/${playlist.id}`}
                className="btn btn-primary btn-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        }
      />
    </div>
  );
};
