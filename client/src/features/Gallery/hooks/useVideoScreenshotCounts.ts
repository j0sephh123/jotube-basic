import { useQuery } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

type VideoScreenshotCount = {
  ytVideoId: string;
  screenshotCount: number;
};

export function useVideoScreenshotCounts(ytChannelId: string) {
  return useQuery({
    queryKey: ["video-screenshot-counts", ytChannelId],
    queryFn: () =>
      nestFetcher<VideoScreenshotCount[]>({
        url: `/screenshots-api/channels/${ytChannelId}/video-screenshot-counts`,
        method: "GET",
      }),
    enabled: !!ytChannelId,
  });
}
