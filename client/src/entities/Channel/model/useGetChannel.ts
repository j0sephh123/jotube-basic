import { useChannelForPlaylist } from "@entities/Channel";

export const useGetChannel = (ytChannelId: string | null) => {
  return useChannelForPlaylist(ytChannelId || undefined);
};
