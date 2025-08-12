import { Link } from "react-router-dom";
import { Playlist } from "../../types";
import { formatLastSync } from "@/shared/components/card/helper";

export const Header = ({ playlist }: { playlist: Playlist }) => {
  return (
    <>
      <div className="mt-12">
        <div className="flex gap-2 items-center justify-between">
          <Link to="/playlists" className="btn btn-ghost btn-sm mb-4">
            ← Back to Playlists
          </Link>
          <h1 className="text-2xl font-bold">{playlist.name}</h1>
          <p>
            Created {formatLastSync(playlist.createdAt)}
          </p>
          <p>
            Total Channels: {playlist.channels.length}
          </p>
        </div>
      </div>
    </>
  );
};
