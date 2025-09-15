import { useFinishProcessingEpisodeMutation } from "@shared/api";

export function useFinishProcessingEpisode(onSuccess?: () => void) {
  const [finishProcessingEpisodeMutation] = useFinishProcessingEpisodeMutation({
    onCompleted: onSuccess,
  });

  return (variables: {
    finishProcessEpisodeInput: {
      tvIdentifier: string;
      episodeIdentifier: string;
      savedSeconds: number[];
    };
  }) => finishProcessingEpisodeMutation({ variables });
}
