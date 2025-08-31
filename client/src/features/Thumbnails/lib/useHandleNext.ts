import { useProcessingState, setCurrentIndex } from "@shared/store";
import { useDialog } from "@shared/hooks";
import { useSubmit, useThumbnailsCount } from "@features/Thumbnails";

export default function useHandleNext() {
  const thumbnailsCount = useThumbnailsCount();
  const { currentIndex } = useProcessingState();
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

  return () => {
    if (thumbnailsCount === 0 || currentIndex < thumbnailsCount - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      try {
        confirm({
          title: "Submit Selection",
          message:
            "You've reached the last thumbnail. Do you want to submit your selection?",
          confirmText: "Submit",
          cancelText: "Cancel",
          onYes: handleSubmit,
        });
      } catch (error) {
        console.error("Error showing confirm dialog:", error);
      }
    }
  };
}
