import { useGetStatisticsCountsQuery } from "@/shared/api/generated/graphql";

export function useTotalCounts() {
  const { data, loading, error } = useGetStatisticsCountsQuery();

  return {
    data: data?.statisticsCounts,
    isLoading: loading,
    error,
  };
}

export function useRefetchTotalCounts() {
  const { refetch } = useGetStatisticsCountsQuery();
  return refetch;
}
