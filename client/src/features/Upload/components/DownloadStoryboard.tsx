import { useCreateStoryboard } from "@features/Upload";
// eslint-disable-next-line import/no-internal-modules
import { type UseCreateStoryboardBody } from "../hooks/useCreateStoryboard";

export function DownloadStoryboard({
  ytVideoIds,
  handleSideEffect,
}: {
  ytVideoIds: string[];
  handleSideEffect: () => void;
}) {
  const { mutateAsync } = useCreateStoryboard();

  const handleCreateStoryboard = (ytVideoIds: UseCreateStoryboardBody["ytVideoIds"]) => {
    mutateAsync({
      ytVideoIds,
    }).then(handleSideEffect);
  };

  return (
    <button
      className="btn btn-soft btn-warning btn-md flex-1"
      onClick={() => handleCreateStoryboard(ytVideoIds)}
    >
      Storyboard
    </button>
  );
}
