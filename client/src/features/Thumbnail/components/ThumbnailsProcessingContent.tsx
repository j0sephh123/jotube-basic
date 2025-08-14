import { useRef } from "react";
import Modal from "@/shared/components/Modal";
import Footer from "./Footer";
import Grid from "./Grid";
import Header from "./Header";
import ThumbnailImage from "./ThumbnailImage";
import Container from "./Container";
import { useThumbnailsSlice } from "@/store/store";
import { useGridCalculator } from "../hooks/useGridCalculator";
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

  const cacheBuster = Date.now();

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { gridData } = useGridCalculator(imageRef);

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
          <ThumbnailImage ref={imageRef} cacheBuster={cacheBuster} />
          <Grid
            key={`${gridData.rows}-${gridData.cols}`}
            gridData={gridData}
            cacheBuster={cacheBuster}
          />
        </Container>
        <Footer onPrevious={handlePrevious} onNext={handleNext} />
      </div>
    </Modal>
  );
}
