import {
  useSubmit,
  useIsLastItem,
  useThumbnailsCount,
  usePaginate,
} from "@features/Thumbnails";
import { useThumbnailsProcessingState } from "@shared/store";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button } from "@shared/ui";

export default function Footer({
  slot,
}: {
  slot: React.ReactNode;
}) {
  const { handlePrevious, handleNext } = usePaginate();
  const thumbnailsCount = useThumbnailsCount();
  const {
    selectedItems: selectedImages,
    currentIndex,
  } = useThumbnailsProcessingState();
  const isLastItem = useIsLastItem();
  const isPreviousDisabled = thumbnailsCount === 0 ? false : currentIndex === 0;

  const handleSubmit = useSubmit();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center justify-between">
      <div className="font-bold flex items-center gap-4">
        <div>Selected: {selectedImages.length}</div>
        {slot}
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="btn btn-soft btn-primary"
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button className="btn btn-soft btn-primary" onClick={handleNext}>
          {isLastItem ? "Submit" : "Next"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button className="btn btn-primary" onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}
