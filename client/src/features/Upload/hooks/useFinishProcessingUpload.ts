import { useFinishProcessingUploadMutation } from "@shared/api";

export function useFinishProcessingUpload(onSuccess?: () => void) {
  const [finishProcessingUploadMutation] = useFinishProcessingUploadMutation({
    onCompleted: onSuccess,
  });

  return (variables: {
    ytChannelId: string;
    ytVideoId: string;
    savedSeconds: number[];
  }) => finishProcessingUploadMutation({ variables });
}
