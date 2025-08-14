import { useRef } from "react";
import Modal from "@/shared/components/Modal";
import Footer from "./Footer";
import Grid from "./Grid";
import Header from "./Header";
import ThumbnailImage from "./ThumbnailImage";
import Container from "./Container";
import { useThumbnailsSlice } from "@/store/store";
import useResetSelection from "../hooks/useResetSelection";
import useEvents from "../hooks/useEvents";
import usePaginate from "../hooks/usePaginate";
import useHandleKeyDown from "../hooks/useHandleKeyDown";
import useHandleContainerWheel from "../hooks/useHandleContainerWheel";

export default function ThumbnailsProcessingContent() {
  const { setThumbnailsProcessingData } = useThumbnailsSlice();

  const handleClose = () => {
    setThumbnailsProcessingData([]);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useResetSelection(containerRef);

  const { handlePrevious, handleNext } = usePaginate();

  const handleKeyDown = useHandleKeyDown(
    handlePrevious,
    handleNext,
    handleClose
  );

  const handleContainerWheel = useHandleContainerWheel(
    handlePrevious,
    handleNext
  );

  useEvents(handleKeyDown, handleContainerWheel, containerRef);

  return (
    <Modal
      isModalVisible
      onClose={handleClose}
      maxWidth="100vw"
      maxHeight="100vh"
    >
      <div className="w-full h-screen p-0">
        <Header />
        <Container ref={containerRef}>
          <ThumbnailImage />
          <Grid />
        </Container>
        <Footer onPrevious={handlePrevious} onNext={handleNext} />
      </div>
    </Modal>
  );
}
