import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { SortOrder } from "@/shared/types/searchParams";

type ChannelsWithoutScreenshotsResponse = {
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
  sortOrder = "desc",
  page = 1,
  perPage = 20,
}: {
  sortOrder?: SortOrder;
  page?: number;
  perPage?: number;
} = {}) {
  return useQuery<ChannelsWithoutScreenshotsResponse>({
    queryKey: ["dashboard/no-screenshots", sortOrder, page, perPage],
    queryFn: () =>
      nestFetcher<ChannelsWithoutScreenshotsResponse>({
        method: "GET",
        url: `/dashboard/no-screenshots?sortOrder=${sortOrder}&page=${page}&perPage=${perPage}`,
      }),
  });
}
