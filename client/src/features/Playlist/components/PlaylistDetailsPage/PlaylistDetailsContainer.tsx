import { useGetPlaylist } from "../../hooks";
import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import { Playlist } from "../../types";

export default function PlaylistDetailsContainer({
  children,
}: {
  children: (playlist: Playlist) => React.ReactNode;
}) {
  const { data: playlist, isLoading, error } = useGetPlaylist();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !playlist) {
    return <ErrorMessage message="Error fetching playlist data" />;
  }

  if (playlist.channels.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-gray-500 text-center py-8">
              No channels in this playlist yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children(playlist)}</>;
}
