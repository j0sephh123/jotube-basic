import { useThumbnailsSlice } from "@/app/providers/store/store";
import useThumbnailsCount from "@/features/Thumbnails/lib/useThumbnailsCount";
import { useDialog } from "@shared/hooks/useDialog";
import useSubmit from "@/features/Thumbnails/lib/useSubmit";

export default function usePaginate() {
  const { currentIndex, setCurrentIndex } = useThumbnailsSlice();
  const thumbnailsCount = useThumbnailsCount();
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

  return { handlePrevious, handleNext };
}
