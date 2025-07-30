import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

type ChannelWithoutUploads = {
  id: number;
  title: string;
  ytId: string;
  createdAt: string;
  src: string;
  videoCount: number;
}

export function useChannelsWithoutUploads(
  sortField: string = "createdAt",
  direction: string = "desc"
) {
  return useQuery<ChannelWithoutUploads[]>({
    queryKey: ["newChannels", sortField, direction],
    queryFn: () =>
      nestFetcher<ChannelWithoutUploads[]>({
        url: `/dashboard/channels-without-uploads?${new URLSearchParams({
          sortField,
          direction,
        })}`,
        method: "GET",
      }),
  });
}
