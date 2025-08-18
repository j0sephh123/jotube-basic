import { useMutation } from "@apollo/client";
import { UPDATE_PLAYLIST } from "@/entities/Playlist/api/playlist.gql";

export const useUpdatePlaylist = () => {
  const [mutate, result] = useMutation(UPDATE_PLAYLIST, {
    refetchQueries: ["GetPlaylists"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
