import { useMutation, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export const useDeleteChannelScreenshot = (ytChannelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      nestFetcher({
        url: `/screenshots-api/screenshots/${id}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["channel-screenshots", ytChannelId],
      });
      queryClient.invalidateQueries({
        queryKey: ["channel-favorites", ytChannelId],
      });
      queryClient.invalidateQueries({
        queryKey: ["channel-favorite-count", ytChannelId],
      });
      queryClient.invalidateQueries({
        queryKey: ["useChannelMetadata", ytChannelId],
      });
    },
  });
};
