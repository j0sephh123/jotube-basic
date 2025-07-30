import nestFetcher from "@/shared/api/nestFetcher";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const queryKey = () => ["totalScreenshots"];

export function useTotalScreenshots() {
  return useQuery({
    queryKey: queryKey(),
    queryFn: () =>
      nestFetcher<number>({
        method: "GET",
        url: "/statistics/total-screenshots",
      }),
  });
}

export function useRefetchTotalScreenshots() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.refetchQueries({ queryKey: queryKey() });
  }, [queryClient]);
}
