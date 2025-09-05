import { nestFetcher } from "@shared/api";
import { useMutation } from "@tanstack/react-query";

export function useAddEpisodeToQueue(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (body: { episodeId: number }) =>
      nestFetcher({
        url: "/queues/add-episode",
        method: "POST",
        body,
      }),
    onSuccess,
  });
}
