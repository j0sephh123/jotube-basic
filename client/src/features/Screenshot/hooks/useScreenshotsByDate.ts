import { nestFetcher } from "@shared/api";
import { useQuery } from "@tanstack/react-query";

type Screenshot = {
  id: number;
  second: number;
  channelTitle: string;
  videoTitle: string;
  isFav: boolean;
  ytChannelId: string;
  ytVideoId: string;
};

export function useScreenshotsByDate(
  month: string | undefined,
  date: string | undefined
) {
  return useQuery<Screenshot[]>({
    queryKey: ["screenshots", month, date],
    queryFn: () =>
      nestFetcher<Screenshot[]>({
        url: `/screenshots-api/screenshots/${month}/${date}`,
        method: "GET",
      }),
    enabled: !!month && !!date,
  });
}
