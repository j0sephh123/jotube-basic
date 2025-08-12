import { useMutation, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      nestFetcher({
        url: `/playlists/${id}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });
};
