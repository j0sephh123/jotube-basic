import { useMutation } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

type UploadsWithStoryboardsResponse = {
  id: number;
  ytId: string;
  title: string;
  src: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  channelId: number;
  nextPageToken: string | null;
  duration: number | null;
  artifact: string;
  storyboard: {
    id: number;
    uploadsVideoId: number;
    fragments: number;
    url: string;
    createdAt: string;
    updatedAt: string;
  };
}[];

export function useGetUploadsWithStoryboards() {
  return useMutation<UploadsWithStoryboardsResponse, unknown, string>({
    mutationFn: (ytChannelId: string) =>
      nestFetcher<UploadsWithStoryboardsResponse>({
        url: `/storyboard/uploadsWithStoryboards?ytChannelId=${ytChannelId}`,
        method: "GET",
      }),
  });
}
