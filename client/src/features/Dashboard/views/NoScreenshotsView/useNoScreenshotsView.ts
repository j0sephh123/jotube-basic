import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { SortOrder } from "@/shared/types/searchParams";
import { DashboardChannel } from "../types";

type Item = DashboardChannel;

type Response = {
  channels: Item[];
  total: number;
};

export function useNoScreenshotsView({
  sortOrder = "desc",
  page = 1,
  perPage = 20,
}: {
  sortOrder?: SortOrder;
  page?: number;
  perPage?: number;
} = {}) {
  return useQuery<Response>({
    queryKey: ["dashboard/no-screenshots", sortOrder, page, perPage],
    queryFn: () =>
      nestFetcher<Response>({
        method: "GET",
        url: `/dashboard/no-screenshots?sortOrder=${sortOrder}&page=${page}&perPage=${perPage}`,
      }),
  });
}
