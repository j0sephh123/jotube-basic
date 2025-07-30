import { useEffect, useRef, useState } from "react";
import Modal from "@/shared/components/Modal";
import { generateThumbnailUrl } from "@/shared/utils/image";
import Footer from "./Footer";
import Grid from "./Grid";
import Header from "./Header";
import ThumbnailImage from "./ThumbnailImage";
import Container from "./Container";
import ZoomModal from "../../../shared/components/ZoomModal";
import { useStore } from "@/store/store";
import { useDialog } from "@/shared/hooks/useDialog";
import { useGridCalculator } from "../hooks/useGridCalculator";
import useSubmit from "../hooks/useSubmit";

const spacing = 10;
const imgWidth = 1900;
const perRow = 8;

type Props = {
  onClose: () => void;
  thumbnailsCount: number;
};

export default function ThumbnailsProcessingContent({
  onClose,
  thumbnailsCount,
}: Props) {
  const {
    setSelectedImages,
    currentIndex,
    setCurrentIndex,
    selectedImages,
    metadata: { ytChannelId, ytVideoId },
  } = useStore();
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [cacheBuster] = useState<number>(Date.now());
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { gridData, calculateGridData } = useGridCalculator(
    imageRef,
    perRow,
    spacing
  );
  const [isZoomModalVisible, setIsZoomModalVisible] = useState<boolean>(false);
  const handleSubmit = useSubmit();
  let confirm: (options: {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onYes: () => void;
  }) => void;
  try {
    const dialogHook = useDialog();
    confirm = dialogHook.confirm;
  } catch {
    confirm = () => console.log("Dialog not available");
  }

  const handleZoom = (index: number): void => {
    const url = `${generateThumbnailUrl(
      ytChannelId,
      ytVideoId,
      index
    )}?v=${cacheBuster}`;
    setZoomImage(url);
    setIsZoomModalVisible(true);
    setSelectedImages((prev) => [...prev, index]);
  };

  const handleImageLoad = () => {
    calculateGridData();
  };

  useEffect(() => {
    setSelectedImages([]);
    setCurrentIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [setSelectedImages, setCurrentIndex]);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    const maxIndex = thumbnailsCount;
    if (thumbnailsCount === 0 || currentIndex < maxIndex - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      try {
        confirm({
          title: "Submit Selection",
          message:
            "You've reached the last thumbnail. Do you want to submit your selection?",
          confirmText: "Submit",
          cancelText: "Cancel",
          onYes: handleSubmit,
        });
      } catch (error) {
        console.error("Error showing confirm dialog:", error);
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isZoomModalVisible) return;

    const maxIndex = thumbnailsCount;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        if (thumbnailsCount === 0 || currentIndex > 0) {
          handlePrevious();
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (thumbnailsCount === 0 || currentIndex < maxIndex) {
          handleNext();
        } else {
          handleSubmit();
        }
        break;
      case "Escape":
        event.preventDefault();
        onClose();
        break;
    }
  };

  const handleContainerWheel = (event: React.WheelEvent) => {
    if (isZoomModalVisible) return;

    event.preventDefault();
    const deltaY = event.deltaY;

    if (deltaY > 0) {
      const maxIndex = thumbnailsCount;
      if (thumbnailsCount === 0 || currentIndex < maxIndex) {
        handleNext();
      } else {
        handleSubmit();
      }
    } else if (deltaY < 0) {
      if (thumbnailsCount === 0 || currentIndex > 0) {
        handlePrevious();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, thumbnailsCount, perRow, isZoomModalVisible]);

  const pageInfo = `${currentIndex + 1} / ${thumbnailsCount}`;

  return (
    <>
      <Modal
        isModalVisible
        onClose={onClose}
        maxWidth="100vw"
        maxHeight="100vh"
      >
        <div className="w-full h-screen p-0">
          <Header pageInfo={pageInfo} />
          <Container ref={containerRef} onWheel={handleContainerWheel}>
            <div
              className="relative inline-block"
              style={{ width: `${imgWidth}px` }}
            >
              <ThumbnailImage
                ref={imageRef}
                onLoad={handleImageLoad}
                cacheBuster={cacheBuster}
                index={currentIndex}
              />
              {!zoomImage && gridData.rows > 0 && (
                <Grid
                  key={`${perRow}-${gridData.rows}-${gridData.cols}`}
                  gridData={gridData}
                  spacing={spacing}
                  handleZoom={handleZoom}
                  batch={currentIndex}
                  perRow={perRow}
                />
              )}
            </div>
          </Container>
          <Footer
            isNextDisabled={false}
            isPreviousDisabled={
              thumbnailsCount === 0 ? false : currentIndex === 0
            }
            onPrevious={handlePrevious}
            onNext={handleNext}
            selectedImages={selectedImages}
            pageInfo={pageInfo}
            isLastItem={
              thumbnailsCount === 0
                ? false
                : currentIndex === thumbnailsCount - 1
            }
          />
        </div>
      </Modal>

      <ZoomModal
        isVisible={isZoomModalVisible}
        imageUrl={zoomImage}
        onClose={() => {
          setIsZoomModalVisible(false);
          setZoomImage(null);
        }}
      />
    </>
  );
}
