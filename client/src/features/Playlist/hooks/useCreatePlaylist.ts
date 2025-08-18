import { useMutation } from "@apollo/client";
import { CREATE_PLAYLIST } from "@entities/Playlist/api/playlist.gql";

export const useCreatePlaylist = () => {
  const [mutate, result] = useMutation(CREATE_PLAYLIST, {
    refetchQueries: ["GetPlaylists"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
