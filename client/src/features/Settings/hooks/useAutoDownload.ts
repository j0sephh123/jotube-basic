import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

const QUERY_KEY = ["settings", "autoDownload"];

export function useAutoDownloadQuery() {
  return useQuery<boolean>({
    queryKey: QUERY_KEY,
    queryFn: () =>
      nestFetcher<boolean>({
        method: "GET",
        url: "/settings/auto-download",
      }),
  });
}

export function useAutoDownloadMutation() {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, boolean>({
    mutationFn: (enabled: boolean) =>
      nestFetcher<boolean>({
        method: "POST",
        url: "/settings/auto-download",
        body: { enabled },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
