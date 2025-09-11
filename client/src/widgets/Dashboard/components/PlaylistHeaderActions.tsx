import { PlaylistHeader } from "@features/Playlist";
import { useGetPlaylist } from "@features/Playlist";

export function PlaylistHeaderActions() {
  const { data: playlist } = useGetPlaylist(null);

  if (!playlist) return null;

  return (
    <PlaylistHeader
      playlist={{
        channels: playlist.playlistDetails?.channels || [],
        createdAt: playlist.playlistDetails?.createdAt || "",
        id: playlist.playlistDetails?.id || 0,
        name: playlist.playlistDetails?.name || "",
        updatedAt: playlist.playlistDetails?.updatedAt || "",
      }}
    />
  );
}
