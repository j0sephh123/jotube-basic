import { useChannelsYearMonthCountsQuery } from "@shared/api";

export function useChannelsYearMonthCounts(viewType: string) {
  const yearMonthCountsQuery = useChannelsYearMonthCountsQuery({
    variables: {
      channelsYearMonthCountsInput: {
        viewType,
      },
    },
  });

  return {
    yearMonthCounts: yearMonthCountsQuery.data?.channelsYearMonthCounts || [],
    isLoading: yearMonthCountsQuery.loading,
    error: yearMonthCountsQuery.error,
    refetch: yearMonthCountsQuery.refetch,
  };
}
