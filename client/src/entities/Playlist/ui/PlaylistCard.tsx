/* eslint-disable boundaries/element-types */
import { Edit, Trash2 } from "lucide-react";
import { type PlaylistResponse } from "@shared/api";
import { setPlaylistModal, useDeletePlaylist } from "@features/Playlist";
import { useDialog } from "@shared/hooks";
import { Button, CustomLink, InfoCard } from "@shared/ui";
import { useRefetchPlaylists } from "@features/Playlist";

interface PlaylistCardProps {
  playlist: PlaylistResponse;
}

export const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const deletePlaylist = useDeletePlaylist();
  const refetchPlaylists = useRefetchPlaylists();

  const dialogHook = useDialog();

  const handleDeleteClick = () => {
    dialogHook.confirm({
      title: "Delete Channel",
      message:
        "Are you sure you want to delete this channel? This action cannot be undone.",
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

  const handleEditClick = () => {
    setPlaylistModal({ type: "update", playlistId: playlist.id });
  };

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
              Created
              {playlist.createdAt
                ? new Date(playlist.createdAt).toLocaleDateString()
                : "Unknown date"}
            </p>
            <div className="flex justify-between items-center mt-4">
              <CustomLink
                to={`/playlists/${playlist.id}`}
                className="btn btn-primary btn-sm"
              >
                View Details
              </CustomLink>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleEditClick}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDeleteClick}
                  disabled={deletePlaylist.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};
