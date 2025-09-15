import { useEpisodesProcessingState, setCurrentIndex } from "@shared/store";
import { useDialog } from "@shared/hooks";
import { useSubmit, useEpisodesCount } from "@features/Episode";

export default function usePaginate() {
  const { currentIndex } = useEpisodesProcessingState();
  const episodesCount = useEpisodesCount();
  const dialogHook = useDialog();
  const handleSubmit = useSubmit();

  let confirm: (options: {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onYes: () => void;
  }) => void;
  try {
    confirm = dialogHook.confirm;
  } catch {
    confirm = () => console.log("Dialog not available");
  }

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (episodesCount === 0 || currentIndex < episodesCount - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      try {
        confirm({
          title: "Submit Selection",
          message:
            "You've reached the last episode. Do you want to submit your selection?",
          confirmText: "Submit",
          cancelText: "Cancel",
          onYes: handleSubmit,
        });
      } catch (error) {
        console.error("Error showing confirm dialog:", error);
      }
    }
  };

  return { handlePrevious, handleNext };
}
