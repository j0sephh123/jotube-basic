import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { DashboardChannel } from "../types";

type Item = DashboardChannel & {
  videoCount: number;
};

type Response = Item[];

export function useNoUploadsView(
  sortField: string = "createdAt",
  direction: string = "desc"
) {
  return useQuery<Response>({
    queryKey: ["newChannels", sortField, direction],
    queryFn: () =>
      nestFetcher<Response>({
        url: `/dashboard/no-uploads?${new URLSearchParams({
          sortField,
          direction,
        })}`,
        method: "GET",
      }),
  });
}
