import nestFetcher from "@/shared/api/nestFetcher";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type GetFreeSpaceResponse = {
  freeSpace: number;
};

// this is not used right now
export function useFreeSpace(
  options?: Omit<UseQueryOptions<GetFreeSpaceResponse>, "queryKey" | "queryFn">
) {
  return useQuery<GetFreeSpaceResponse>({
    queryKey: ["free-space"],
    queryFn: () =>
      nestFetcher({
        method: "GET",
        url: "/statistics/free-space",
      }),
    refetchInterval: 1000 * 60, // 1 minute
    ...options,
  });
}
