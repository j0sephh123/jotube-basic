import { useGetPlaylist } from "@features/Playlist";
import { StaticStates } from "@shared/ui";
import type { PlaylistDetailsResponse } from "@shared/api";

export default function PlaylistDetailsContainer({
  children,
}: {
  children: (playlist: PlaylistDetailsResponse, refetch: () => void) => React.ReactNode;
}) {
  const {
    data: playlist,
    loading: isLoading,
    error,
    refetch,
  } = useGetPlaylist(null);

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={!playlist?.playlistDetails}
    >
      {children(playlist?.playlistDetails as PlaylistDetailsResponse, refetch)}
    </StaticStates>
  );
}
