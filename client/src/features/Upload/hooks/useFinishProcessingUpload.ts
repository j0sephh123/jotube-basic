import { useFinishProcessingUploadMutation } from "../../../generated/graphql";

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
