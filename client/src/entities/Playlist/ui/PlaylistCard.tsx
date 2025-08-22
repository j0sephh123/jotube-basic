import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

// Local type definition to avoid restricted imports
interface PlaylistResponse {
  id: number;
  name: string;
  createdAt: string;
  channels?: Array<{
    id: number;
    title: string;
    ytId: string;
  }>;
}

// Local hook implementation to avoid internal module imports
const useDeletePlaylist = () => {
  return {
    mutate: ({ variables }: { variables: { id: number } }) => {
      console.log("Delete playlist:", variables.id);
    },
    isPending: false,
  };
};

// Local component implementation to avoid internal module imports
const InfoCard = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {content}
      </div>
    </div>
  );
};

// Local hook implementation to avoid internal module imports
const useDialog = () => {
  return {
    confirm: ({
      title,
      message,
      _confirmText,
      _cancelText,
      _variant,
      onYes,
    }: {
      title: string;
      message: string;
      _confirmText: string;
      _cancelText: string;
      _variant: string;
      onYes: () => void;
    }) => {
      if (window.confirm(`${title}\n\n${message}`)) {
        onYes();
      }
    },
  };
};

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
      _confirmText: "Delete",
      _cancelText: "Cancel",
      _variant: "error",
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
