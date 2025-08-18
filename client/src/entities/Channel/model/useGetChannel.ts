import { useChannelForPlaylist } from "@entities/Channel/api/useChannelForPlaylist.gql";

export const useGetChannel = (ytChannelId: string | null) => {
  return useChannelForPlaylist(ytChannelId || undefined);
};
