import { useThumbnailsSlice } from "@/store/store";
import Modal from "../../shared/components/Modal";
import { useThumbnailByVideoId } from "@/features/Thumbnail/hooks/useThumbnailByVideoId";
import ThumbnailsProcessingContent from "./components/ThumbnailsProcessingContent";

export default function ThumbnailsProcessing() {
  const { thumbnailsProcessingData, setThumbnailsProcessingData, metadata } =
    useThumbnailsSlice();

  const handleClose = () => {
    setThumbnailsProcessingData([]);
  };

  const { data, isLoading } = useThumbnailByVideoId(metadata.ytVideoId);

  if (thumbnailsProcessingData.length === 0) {
    return null;
  }

  if (isLoading || !data) {
    return (
      <Modal
        isModalVisible
        onClose={handleClose}
        maxWidth="100vw"
        maxHeight="100vh"
      >
        <div className="flex justify-center items-center h-full">
          <div className="text-2xl font-bold">Loading...</div>
        </div>
      </Modal>
    );
  }

  return <ThumbnailsProcessingContent />;
}
