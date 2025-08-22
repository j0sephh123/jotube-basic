import { useMutation } from "@apollo/client";
import { UpdateChannelPlaylistDocument } from "@shared/api/generated/graphql";

export const useUpdateChannelPlaylist = () => {
  const [mutate, result] = useMutation(UpdateChannelPlaylistDocument, {
    refetchQueries: ["GetPlaylists"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
