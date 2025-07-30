import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export type VideoScreenshot = {
  id: number;
  second: number;
  ytChannelId: string;
  ytVideoId: string;
  isFav: boolean;
  src: string;
}

export function useScreenshotsByVideo(ytVideoId: string | undefined) {
  return useQuery<VideoScreenshot[]>({
    queryKey: ["screenshots-by-video", ytVideoId],
    queryFn: () =>
      nestFetcher<VideoScreenshot[]>({
        url: `/screenshots-api/video-screenshots/${ytVideoId}`,
        method: "GET",
      }),
    enabled: !!ytVideoId,
  });
}
