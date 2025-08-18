import { useRef } from "react";
import Modal from "@shared/ui/Modal";
import Footer from "@widgets/Thumbnails/ui/Footer";
import Grid from "@widgets/Thumbnails/ui/Grid";
import Header from "@widgets/Thumbnails/ui/Header";
import ThumbnailImage from "@widgets/Thumbnails/ui/ThumbnailImage";
import Container from "@widgets/Thumbnails/ui/Container";
import useResetSelection from "@features/Thumbnail/hooks/useResetSelection";
import useEvents from "@features/Thumbnail/hooks/useEvents";
import useHandleKeyDown from "@features/Thumbnail/hooks/useHandleKeyDown";
import useHandleContainerWheel from "@features/Thumbnail/hooks/useHandleContainerWheel";
import { useThumbnailsSlice } from "@store/store";

export default function ThumbnailsProcessingContent() {
  const { clearThumbnailsProcessingData } = useThumbnailsSlice();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useHandleKeyDown();
  const handleContainerWheel = useHandleContainerWheel();

  useEvents(handleKeyDown, handleContainerWheel, containerRef);
  useResetSelection(containerRef);

  return (
    <Modal
      isModalVisible
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
