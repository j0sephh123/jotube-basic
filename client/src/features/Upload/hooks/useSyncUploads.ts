import { useSyncUploadsMutation } from "@shared/api";
import { useRefetchChannelUploads } from "@features/Upload";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";
import { useRefetchChannelsDashboardQuery } from "@features/Dashboard";
import { type SyncUploadsInput } from "@shared/api";

export type SyncUploadsRequest = {
  channelId: number;
};

export default function useSyncUploads() {
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchChannelUploads = useRefetchChannelUploads();
  const refetchChannelsDashboard = useRefetchChannelsDashboardQuery();

  const [syncUploadsMutation, { loading }] = useSyncUploadsMutation({
    onCompleted: () => {
      refetchChannelMetadata();
      refetchChannelUploads();
      refetchChannelsDashboard();
    },
  });

  return {
    mutateAsync: (syncUploadsInput: SyncUploadsInput) => {
      return syncUploadsMutation({
        variables: {
          syncUploadsInput,
        },
      });
    },
    isPending: loading,
  };
}
