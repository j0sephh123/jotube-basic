import { useMutation } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";
import { useRefetchChannelUploads } from "./useUploadsList";

export type SyncUploadsRequest = {
  ytChannelId: string;
  channelId: number;
};

export default function useSyncUploads(ytChannelId: string) {
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchChannelUploads = useRefetchChannelUploads(ytChannelId);

  return useMutation<void, unknown, SyncUploadsRequest>({
    mutationFn: (body: SyncUploadsRequest) =>
      nestFetcher<void>({
        url: "/uploads-video/sync-uploads",
        method: "POST",
        body,
      }),
    onSuccess: () => {
      refetchChannelMetadata(ytChannelId);
      refetchChannelUploads();
    },
  });
}
