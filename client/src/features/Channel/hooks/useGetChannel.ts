import { useChannelForPlaylist } from "./useChannelForPlaylist";

export const useGetChannel = (ytChannelId: string | null) => {
  return useChannelForPlaylist(ytChannelId || undefined);
};
