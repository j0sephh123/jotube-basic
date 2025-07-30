import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export function useScreenshots() {
  return useQuery<Record<string, number>>({
    queryKey: ["screenshots"],
    queryFn: () =>
      nestFetcher<Record<string, number>>({
        url: "/screenshots-api/screenshots",
        method: "GET",
      }),
  });
}
