import { useUpdateChannelPlaylistMutation } from "@shared/api";

export const useUpdateChannelPlaylist = () => {
  const [mutate, result] = useUpdateChannelPlaylistMutation({
    refetchQueries: ["GetPlaylists", "GetPlaylistDetails"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
