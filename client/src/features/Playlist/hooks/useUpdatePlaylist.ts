import { useMutation } from "@apollo/client";
import { UpdatePlaylistDocument } from "@shared/api";

export const useUpdatePlaylist = () => {
  const [mutate, result] = useMutation(UpdatePlaylistDocument, {
    refetchQueries: ["GetPlaylists"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
