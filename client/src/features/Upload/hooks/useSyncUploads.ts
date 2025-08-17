import { useSyncUploadsMutation } from "@/generated/graphql";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";
import { useRefetchChannelUploads } from "./useUploadsList";

export type SyncUploadsRequest = {
  ytChannelId: string;
  channelId: number;
};

export default function useSyncUploads(ytChannelId: string) {
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchChannelUploads = useRefetchChannelUploads(ytChannelId);

  const [syncUploadsMutation, { loading }] = useSyncUploadsMutation({
    onCompleted: () => {
      refetchChannelMetadata(ytChannelId);
      refetchChannelUploads();
    },
  });

  return {
    mutateAsync: (body: SyncUploadsRequest) => {
      return syncUploadsMutation({
        variables: {
          syncUploadsInput: body,
        },
      });
    },
    isPending: loading,
  };
}
