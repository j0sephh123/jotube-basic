import { type PlaylistResponse } from "@shared/api";
import { useDialog } from "@shared/hooks";
import { Button } from "@shared/ui";
import { timeAgo } from "@shared/utils";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeletePlaylist, useRefetchPlaylists } from "../hooks";
import { setPlaylistModal } from "../model";

export function PlaylistListItem({ playlist }: { playlist: PlaylistResponse }) {
  const deletePlaylist = useDeletePlaylist();
  const refetchPlaylists = useRefetchPlaylists();
  const dialogHook = useDialog();
  const navigate = useNavigate();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dialogHook.confirm({
      title: "Delete Playlist",
      message:
        "Are you sure you want to delete this playlist? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "error",
      onYes: () => {
        deletePlaylist.mutate({
          variables: {
            id: playlist.id,
          },
          onCompleted: () => {
            refetchPlaylists();
          },
        });
      },
    });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaylistModal({ type: "update", playlistId: playlist.id });
  };

  const handleItemClick = () => {
    navigate(`/dashboard/playlists/channels/${playlist.id}`);
  };

  return (
    <div
      key={playlist.id}
      className="flex justify-between items-center p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer"
      onClick={handleItemClick}
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-base-content hover:text-base-content/80 font-medium text-lg">
            {playlist.name}
          </h3>
          <span className="badge badge-outline badge-sm text-xs">
            {playlist.channels.length} channel
            {playlist.channels.length !== 1 ? "s" : ""}
          </span>
        </div>
        <span className="text-sm text-base-content/60">
          {timeAgo(playlist.createdAt)}
        </span>
      </div>
      <div
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Button variant="outline" size="sm" onClick={handleEditClick}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteClick}
          disabled={deletePlaylist.isPending}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}