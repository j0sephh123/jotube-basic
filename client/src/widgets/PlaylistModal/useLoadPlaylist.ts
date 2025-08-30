import { useGetPlaylist } from "@features/Playlist";
import { usePlaylistModalState } from "@features/Playlist";
import { useEffect } from "react";

export function useLoadPlaylist(handleInputChange: (value: string) => void) {
  const { playlistId } = usePlaylistModalState();
  const { data: playlist } = useGetPlaylist(playlistId);

  useEffect(() => {
    if (playlistId && playlist) {
      handleInputChange(playlist.playlistDetails?.name || "");
    }
  }, [handleInputChange, playlist, playlistId]);
}
