import { useRef } from "react";
import Modal from "@shared/ui/Modal";
import Footer from "@features/Thumbnail/components/Footer";
import Grid from "@features/Thumbnail/components/Grid";
import Header from "@features/Thumbnail/components/Header";
import ThumbnailImage from "@features/Thumbnail/components/ThumbnailImage";
import Container from "@features/Thumbnail/components/Container";
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
