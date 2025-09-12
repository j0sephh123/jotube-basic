import { type PlaylistResponse } from "@shared/api";
import { timeAgo } from "@shared/utils";
import { useNavigate } from "react-router-dom";

export function PlaylistListItemNavbar({
  playlist,
  onPlaylistClick,
}: {
  playlist: PlaylistResponse;
  onPlaylistClick?: (playlistId: number) => void;
}) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (onPlaylistClick) {
      onPlaylistClick(playlist.id);
    } else {
      navigate(`/dashboard/playlists/channels/${playlist.id}`);
    }
  };

  return (
    <div
      className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800/70 transition-colors cursor-pointer border border-zinc-700/50"
      onClick={handleItemClick}
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-white hover:text-zinc-300 font-medium text-sm">
            {playlist.name}
          </h3>
          <span className="badge badge-outline badge-xs text-xs bg-zinc-700/50 text-zinc-300 border-zinc-600">
            {playlist.channels.length} channel
            {playlist.channels.length !== 1 ? "s" : ""}
          </span>
        </div>
        <span className="text-xs text-zinc-400">
          {timeAgo(playlist.createdAt)}
        </span>
      </div>
    </div>
  );
}
