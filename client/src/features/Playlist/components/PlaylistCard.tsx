import { Link } from "react-router-dom";
import { Playlist } from "../types";

interface PlaylistCardProps {
  playlist: Playlist;
}

export const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="card-body">
        <h2 className="card-title text-xl">{playlist.name}</h2>
        <p className="text-sm text-gray-500">
          {playlist.channels?.length || 0} channel
          {(playlist.channels?.length || 0) !== 1 ? "s" : ""}
        </p>
        <p className="text-xs text-gray-400">
          Created{" "}
          {playlist.createdAt
            ? new Date(playlist.createdAt).toLocaleDateString()
            : "Unknown date"}
        </p>
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/playlists/${playlist.id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
