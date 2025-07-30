import { useStore } from "@/store/store";
import OpenExplorerButton from "../../../shared/components/OpenDirectoryButton/OpenDirectoryButton";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import useSubmit from "../hooks/useSubmit";

type Props = {
  onPrevious: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  selectedImages: number[];
  pageInfo: string;
  isLastItem: boolean;
};

export default function Footer({
  onPrevious,
  onNext,
  isNextDisabled,
  isPreviousDisabled,
  selectedImages,
  pageInfo,
  isLastItem,
}: Props) {
  const handleSubmit = useSubmit();
  const { metadata } = useStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center justify-between">
      <div className="font-bold flex items-center gap-4">
        <div>Selected: {selectedImages.length}</div>
        <OpenExplorerButton
          ytChannelId={metadata.ytChannelId}
          ytVideoId={metadata.ytVideoId}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          className="btn btn-soft btn-primary"
          onClick={onPrevious}
          disabled={isPreviousDisabled}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
        <button
          className="btn btn-soft btn-primary"
          onClick={onNext}
          disabled={isNextDisabled}
        >
          {isLastItem ? "Submit" : "Next"}{" "}
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
        <div className="text-gray-300 text-sm">{pageInfo}</div>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn btn-primary" onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </button>
      </div>
    </div>
  );
}
