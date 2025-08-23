import { useSyncUploadsMutation } from "@shared/api";
import { useRefetchChannelMetadata } from "@entities/Channel";
import { useRefetchChannelUploads } from "@features/Upload";
import { useRefetchChannelsDashboardQuery } from "@features/Dashboard";

export type SyncUploadsRequest = {
  ytChannelId: string;
  channelId: number;
};

export default function useSyncUploads(ytChannelId: string) {
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchChannelUploads = useRefetchChannelUploads(ytChannelId);
  const refetchChannelsDashboard = useRefetchChannelsDashboardQuery();

  const [syncUploadsMutation, { loading }] = useSyncUploadsMutation({
    onCompleted: () => {
      refetchChannelMetadata();
      refetchChannelUploads();
      refetchChannelsDashboard();
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
