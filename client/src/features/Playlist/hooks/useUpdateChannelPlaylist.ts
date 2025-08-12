import { useMutation, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { UpdateChannelPlaylistDto, Channel } from "../types";

export const useUpdateChannelPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateChannelPlaylistDto;
    }) =>
      nestFetcher<Channel>({
        url: `/channel/${id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["channels"] });
    },
  });
};
