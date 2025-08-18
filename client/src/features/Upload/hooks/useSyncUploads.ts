import { useSyncUploadsMutation } from "@/generated/graphql";
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";
import { useRefetchChannelUploads } from "@features/Upload/hooks/useUploadsList";

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
