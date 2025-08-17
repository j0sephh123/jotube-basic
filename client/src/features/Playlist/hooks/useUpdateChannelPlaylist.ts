import { useMutation } from "@apollo/client";
import { UPDATE_CHANNEL_PLAYLIST } from "@/shared/api/graphql/playlistQueries";

export const useUpdateChannelPlaylist = () => {
  const [mutate, result] = useMutation(UPDATE_CHANNEL_PLAYLIST, {
    refetchQueries: ["GetPlaylists"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
