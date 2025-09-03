import { useQuery } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

type VideoScreenshotCount = {
  ytVideoId: string;
  screenshotCount: number;
  dateAdded: Date;
};

export function useVideoScreenshotCounts(channelId: number) {
  return useQuery({
    queryKey: ["video-screenshot-counts", channelId],
    queryFn: () =>
      nestFetcher<VideoScreenshotCount[]>({
        url: `/screenshots-api/channels/${channelId}/video-screenshot-counts`,
        method: "GET",
      }),
    enabled: !!channelId,
  });
}
