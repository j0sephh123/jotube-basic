import { useCreateStoryboard } from "@features/Upload";

export function DownloadStoryboard({
  ytVideoId,
  handleSideEffect,
}: {
  ytVideoId: string;
  handleSideEffect: () => void;
}) {
  const { mutateAsync } = useCreateStoryboard();

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
