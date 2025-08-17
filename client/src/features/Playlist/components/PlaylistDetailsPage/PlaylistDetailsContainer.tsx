import { useGetPlaylist } from "../../hooks";
import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/ui/static/ErrorMessage";
import { PlaylistDetailsResponse } from "@/generated/graphql";

export default function PlaylistDetailsContainer({
  children,
}: {
  children: (playlist: PlaylistDetailsResponse) => React.ReactNode;
}) {
  const { data: playlist, loading: isLoading, error } = useGetPlaylist();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !playlist?.playlistDetails) {
    return <ErrorMessage message="Error fetching playlist data" />;
  }

  if (playlist.playlistDetails.channels.length === 0) {
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

  return <>{children(playlist.playlistDetails)}</>;
}
