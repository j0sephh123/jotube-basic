import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export type ChannelsWithoutScreenshotsResponse = {
  channels: {
    id: number;
    title: string;
    ytId: string;
    createdAt: string;
    src: string;
  }[];
  total: number;
};

export function useChannelsWithoutScreenshots({
  sortOrder,
  page,
  perPage,
}: {
  sortOrder: "asc" | "desc";
  page: number;
  perPage: number;
}) {
  return useQuery<ChannelsWithoutScreenshotsResponse>({
    queryKey: [
      "dashboard/channels-without-screenshots",
      sortOrder,
      page,
      perPage,
    ],
    queryFn: () =>
      nestFetcher<ChannelsWithoutScreenshotsResponse>({
        method: "GET",
        url: `/dashboard/channels-without-screenshots?sortOrder=${sortOrder}&page=${page}&perPage=${perPage}`,
      }),
  });
}
