import { useRef } from "react";
import { Modal } from "@shared/ui";
import { clearThumbnailsProcessingData } from "@features/Thumbnails";
import {
  Footer,
  Grid,
  Header,
  ThumbnailImage,
  Container,
  useResetSelection,
  useHandleKeyDown,
  useHandleContainerWheel,
  useThumbnailsState,
  useEvents,
} from "@features/Thumbnails";

export default function ThumbnailsProcessingContent() {
  const { thumbnailsProcessingData } = useThumbnailsState();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useHandleKeyDown();
  const handleContainerWheel = useHandleContainerWheel();

  useEvents(handleKeyDown, handleContainerWheel, containerRef);
  useResetSelection(containerRef);

  const isModalVisible = thumbnailsProcessingData.length > 0;

  return (
    <Modal
      isModalVisible={isModalVisible}
      onClose={clearThumbnailsProcessingData}
      maxWidth="100vw"
      maxHeight="100vh"
    >
      <div className="w-full h-screen p-0">
        <Header />
        <Container ref={containerRef}>
          <ThumbnailImage />
          <Grid />
        </Container>
        <Footer />
      </div>
    </Modal>
  );
}
