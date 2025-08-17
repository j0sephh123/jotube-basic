import { useGetChannelForPlaylistQuery } from "@/generated/graphql";

export type ChannelForPlaylistI = {
  id: number;
  title: string;
};

export function useChannelForPlaylist(ytChannelId: string | undefined) {
  const { data, loading, error, refetch } = useGetChannelForPlaylistQuery({
    variables: { ytChannelId: ytChannelId || "" },
    skip: !ytChannelId,
  });

  return {
    data: data?.channelForPlaylist as ChannelForPlaylistI | undefined,
    isLoading: loading,
    error,
    refetch,
  };
}
