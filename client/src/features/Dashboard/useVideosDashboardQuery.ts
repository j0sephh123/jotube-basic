import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export function useVideosDashboardQuery() {
  return useQuery<any[]>({
    queryKey: ["dashboard", "videos"],
    queryFn: () =>
      nestFetcher<any[]>({
        method: "POST",
        url: "/dashboard/videos",
      }),
  });
}
