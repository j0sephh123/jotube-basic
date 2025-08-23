import { useApolloClient } from "@apollo/client";
import { useGetChannelMetadataQuery } from "@shared/api";

export function useChannelMetadataQuery(ytChannelId: string | undefined) {
  const { data, loading, error, refetch } = useGetChannelMetadataQuery({
    variables: { ytChannelId: ytChannelId || "" },
    skip: !ytChannelId,
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
