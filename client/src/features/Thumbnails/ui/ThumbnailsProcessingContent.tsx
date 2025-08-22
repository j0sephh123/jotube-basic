import { useRef } from "react";
import Modal from "@shared/ui/Modal";
import Footer from "@/features/Thumbnails/ui/Footer";
import Grid from "@/features/Thumbnails/ui/Grid";
import Header from "@/features/Thumbnails/ui/Header";
import ThumbnailImage from "@/features/Thumbnails/ui/ThumbnailImage";
import Container from "@/features/Thumbnails/ui/Container";
import useResetSelection from "@/features/Thumbnails/lib/useResetSelection";
import useHandleKeyDown from "@/features/Thumbnails/lib/useHandleKeyDown";
import useHandleContainerWheel from "@/features/Thumbnails/lib/useHandleContainerWheel";
import { useThumbnailsSlice } from "@/app/providers/store/store";
import useEvents from "@/features/Thumbnails/lib/useEvents";

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
