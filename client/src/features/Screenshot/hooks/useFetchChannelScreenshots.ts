import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export type ChannelScreenshot = {
  id: number;
  src: string;
  ytVideoId: string;
  second: number;
  isFav: boolean;
}

export function useFetchChannelScreenshots(ytChannelId: string) {
  return useQuery<ChannelScreenshot[]>({
    queryKey: ["channel-screenshots", ytChannelId],
    queryFn: () =>
      nestFetcher({
        url: `/thumbnails-api/channel/${ytChannelId}/screenshots`,
        method: "GET",
      }),
    enabled: !!ytChannelId,
  });
}
