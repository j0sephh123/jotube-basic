import { useRef } from "react";
import Modal from "@/shared/components/Modal";
import Footer from "./Footer";
import Grid from "./Grid";
import Header from "./Header";
import ThumbnailImage from "./ThumbnailImage";
import Container from "./Container";
import useResetSelection from "../hooks/useResetSelection";
import useEvents from "../hooks/useEvents";
import useHandleKeyDown from "../hooks/useHandleKeyDown";
import useHandleContainerWheel from "../hooks/useHandleContainerWheel";
import { useThumbnailsSlice } from "@/store/store";

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
