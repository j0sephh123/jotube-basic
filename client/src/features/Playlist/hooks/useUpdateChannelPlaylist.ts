import { useMutation } from "@apollo/client";
import { UPDATE_CHANNEL_PLAYLIST } from "@/entities/Playlist/api/playlist.gql";

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
