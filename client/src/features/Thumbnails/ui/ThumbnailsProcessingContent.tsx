import { useRef } from "react";
import { Modal } from "@shared/ui";
import { clearProcessingData } from "@shared/store";
import {
  Footer,
  Grid,
  Header,
  ThumbnailImage,
  Container,
  useResetSelection,
  useHandleKeyDown,
  useHandleContainerWheel,
  useEvents,
} from "@features/Thumbnails";
import { useProcessingState } from "@shared/store";

export default function ThumbnailsProcessingContent() {
  const { items: thumbnailsProcessingData } = useProcessingState();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useHandleKeyDown();
  const handleContainerWheel = useHandleContainerWheel();

  useEvents(handleKeyDown, handleContainerWheel, containerRef);
  useResetSelection(containerRef);

  const isModalVisible = thumbnailsProcessingData.length > 0;

  return (
    <Modal
      isModalVisible={isModalVisible}
      onClose={clearProcessingData}
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
