import { useSyncUploadsMutation } from "@shared/api";
import { useRefetchChannelMetadata } from "@entities/Channel";
import { useRefetchChannelUploads } from "@features/Upload";

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
