import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { PlaylistResponse } from "@/generated/graphql";
import { useDeletePlaylist } from "@features/Playlist/hooks";
import InfoCard from "@shared/ui/InfoCard";
import { useDialog } from "@shared/hooks/useDialog";

interface PlaylistCardProps {
  playlist: PlaylistResponse;
}

export const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const deletePlaylist = useDeletePlaylist();
  const dialogHook = useDialog();

  const handleDeleteClick = () => {
    dialogHook.confirm({
      title: "Delete Playlist",
      message: `Are you sure you want to delete "${playlist.name}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "error",
      onYes: () => {
        deletePlaylist.mutate({
          variables: { id: playlist.id },
        });
      },
    });
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
              Created{" "}
              {playlist.createdAt
                ? new Date(playlist.createdAt).toLocaleDateString()
                : "Unknown date"}
            </p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleDeleteClick}
                className="btn btn-error btn-sm btn-circle"
                disabled={deletePlaylist.isPending}
                aria-label="Delete playlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
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
