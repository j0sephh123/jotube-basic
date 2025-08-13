import nestFetcher from "@/shared/api/nestFetcher";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

type TotalCounts = {
  totalScreenshots: number;
  totalThumbnails: number;
  totalSaved: number;
};

const queryKey = () => ["totalCounts"];

export function useTotalCounts() {
  return useQuery({
    queryKey: queryKey(),
    queryFn: () =>
      nestFetcher<TotalCounts>({
        method: "GET",
        url: "/statistics/counts",
      }),
  });
}

export function useRefetchTotalCounts() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.refetchQueries({ queryKey: queryKey() });
  }, [queryClient]);
}
