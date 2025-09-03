import { useSyncUploadsMutation } from "@shared/api";
import { useRefetchChannelUploads } from "@features/Upload";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";
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
