import { useQuery } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

type FreeSpaceResponse = {
  freeSpace: string;
};

export function useFreeSpace() {
  return useQuery<FreeSpaceResponse>({
    queryKey: ["free-space"],
    queryFn: () =>
      nestFetcher<FreeSpaceResponse>({
        url: "/statistics/free-space",
        method: "GET",
      }),
  });
}
