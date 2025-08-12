import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { DashboardChannel } from "@/features/Dashboard/types";

export const useGetChannel = (ytChannelId: string | null) => {
  return useQuery<DashboardChannel>({
    queryKey: ["channel", ytChannelId],
    queryFn: () =>
      nestFetcher<DashboardChannel>({
        url: `/channel/by-yt-id/${ytChannelId}`,
        method: "GET",
      }),
    enabled: !!ytChannelId,
  });
};
