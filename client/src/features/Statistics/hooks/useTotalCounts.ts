import { useGetStatisticsCountsQuery } from "../../../generated/graphql";

export function useTotalCounts() {
  const { data, loading, error } = useGetStatisticsCountsQuery();

  return {
    data: data?.statisticsCounts,
    isLoading: loading,
    error,
  };
}
