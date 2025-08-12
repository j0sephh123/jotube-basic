import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePlaylistDto, Playlist } from "../types";
import nestFetcher from "@/shared/api/nestFetcher";

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlaylistDto) =>
      nestFetcher<Playlist>({
        url: "/playlists",
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });
};
