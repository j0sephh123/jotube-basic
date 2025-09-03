import { Button } from "@shared/ui";
import { setPlaylistModal } from "../model";
import { useRemoveFromPlaylist } from "../hooks";
import { ListMusic } from "lucide-react";

type Props = {
  isPlaylistPage: boolean;
  id: number;
  playlistId: number;
  playlistName: string;
};

export function PlaylistControl({ isPlaylistPage, id, playlistId, playlistName }: Props) {
  const removeFromPlaylist = useRemoveFromPlaylist();

  return isPlaylistPage ? (
    <Button
      onClick={() => removeFromPlaylist.handleRemoveFromPlaylist(id)}
      size="sm"
    >
      Remove
    </Button>
  ) : (
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
