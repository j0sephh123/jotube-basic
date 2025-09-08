import { setPlaylistModal } from "../model";
import { ListMusic } from "lucide-react";

type Props = {
  id: number;
  playlistId: number;
  playlistName: string;
};

export function PlaylistControl({ id, playlistId, playlistName }: Props) {
  return (
    <div
      className="flex items-center gap-2 text-sm cursor-pointer"
      onClick={() =>
        setPlaylistModal({
          type: "modifyPlaylistForChannel",
          channelId: id,
          playlistId: playlistId ?? 0,
        })
      }
    >
      <ListMusic className="w-4 h-4" />
      {playlistName ? (
        <span className="truncate">{playlistName}</span>
      ) : (
        <span className="truncate">No playlist</span>
      )}
    </div>
  );
}
