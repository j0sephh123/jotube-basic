import nestFetcher from "@/shared/api/nestFetcher";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const queryKey = () => ["totalThumbnails"];

export function useTotalThumbnails() {
  return useQuery({
    queryKey: queryKey(),
    queryFn: () =>
      nestFetcher<number>({
        method: "GET",
        url: "/statistics/total-thumbnails",
      }),
  });
}

export function useRefetchTotalThumbnails() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.refetchQueries({ queryKey: queryKey() });
  }, [queryClient]);
} 