import { useMutation } from "@apollo/client";
import { DELETE_PLAYLIST } from "@/entities/Playlist/api/playlist.gql";

export const useDeletePlaylist = () => {
  const [mutate, result] = useMutation(DELETE_PLAYLIST, {
    refetchQueries: ["GetPlaylists"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
