import { useMutation, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@shared/api/rest/nestFetcher";

export const useUpdateChannelScreenshot = (ytChannelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isFav }: { id: number; isFav: boolean }) =>
      nestFetcher({
        url: `/screenshots-api/screenshots/${id}`,
        method: "PUT",
        body: { isFav },
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
