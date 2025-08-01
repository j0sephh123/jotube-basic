import { useMutation } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export function useGetUploadsWithThumbnails() {
  const { mutateAsync } = useMutation<
    {
      ytChannelId: string;
      ytVideoId: string;
    }[],
    unknown,
    number[]
  >({
    mutationFn: (channelIds: number[]) =>
      nestFetcher<
        {
          ytChannelId: string;
          ytVideoId: string;
        }[]
      >({
        url: "/thumbnails-api/uploadsWithThumbnails",
        method: "POST",
        body: { channelIds },
      }),
  });

  return { mutateAsync };
}
