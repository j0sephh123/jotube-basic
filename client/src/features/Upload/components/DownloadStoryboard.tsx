import { useCreateStoryboard } from "@features/Upload";

export function DownloadStoryboard({
  ytVideoId,
  ytChannelId,
  handleSideEffect,
}: {
  ytVideoId: string;
  ytChannelId: string;
  handleSideEffect: () => void;
}) {
  const { mutateAsync } = useCreateStoryboard(ytChannelId);

  const handleCreateStoryboard = (ytVideoId: string) => {
    mutateAsync({
      ytVideoId,
    }).then(handleSideEffect);
  };

  return (
    <button
      className="btn btn-soft btn-warning btn-md flex-1"
      onClick={() => handleCreateStoryboard(ytVideoId)}
    >
      Storyboard
    </button>
  );
}
