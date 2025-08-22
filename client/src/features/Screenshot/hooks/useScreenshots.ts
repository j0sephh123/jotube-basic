import { useGetScreenshotsQuery } from "@shared/api";

export function useScreenshots() {
  const { data, loading, error } = useGetScreenshotsQuery();

  const transformedData = data?.screenshots?.reduce((acc, item) => {
    acc[item.month] = item.count;
    return acc;
  }, {} as Record<string, number>);

  return {
    data: transformedData,
    isLoading: loading,
    error,
  };
}
