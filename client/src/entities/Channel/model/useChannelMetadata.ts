import { useApolloClient } from "@apollo/client";
import { useGetChannelMetadataQuery } from "@shared/api";

export function useChannelMetadataQuery(channelId: number) {
  const { data, loading, error, refetch } = useGetChannelMetadataQuery({
    variables: { channelMetadataInput: { channelId } },
    skip: !channelId,
  });

  return {
    data: data?.channelMetadata,
    isLoading: loading,
    error,
    refetch,
  };
}

export function useRefetchChannelMetadata() {
  const client = useApolloClient();

  return () => client.refetchQueries({ include: ["GetChannelMetadata"] });
}
