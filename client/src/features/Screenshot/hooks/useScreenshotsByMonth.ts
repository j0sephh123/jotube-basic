import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/rest/nestFetcher";

export function useScreenshotsByMonth(month: string | undefined) {
  return useQuery<Record<string, number>>({
    queryKey: ["screenshots-by-month", month],
    queryFn: () =>
      nestFetcher<Record<string, number>>({
        url: `/screenshots-api/screenshots/${month}`,
        method: "GET",
      }),
    enabled: !!month,
  });
}
