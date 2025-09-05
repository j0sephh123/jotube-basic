import {
  Container,
  Grid,
  Header,
  ThumbnailImage,
  Footer,
  useEvents,
  useHandleContainerWheel,
  useHandleKeyDown,
  useResetSelection,
} from "@features/Thumbnails";
import { setZoom } from "@features/Screenshot";
import { setSelectedImages, useThumbnailsProcessingState } from "@shared/store";
import { generateThumbnailUrl } from "@shared/utils";
import { useRef } from "react";

export function ManualThumbnailsPicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { items: thumbnailsProcessingData } = useThumbnailsProcessingState();

  const handleZoom = (index: number): void => {
    const url = generateThumbnailUrl(
      thumbnailsProcessingData[0]?.ytChannelId ?? "",
      thumbnailsProcessingData[0]?.ytVideoId ?? "",
      index
    );
    setZoom(url);
    setSelectedImages((prev) => [...prev, index]);
  };

  const handleKeyDown = useHandleKeyDown();
  const handleContainerWheel = useHandleContainerWheel();

  useEvents(handleKeyDown, handleContainerWheel, containerRef);
  useResetSelection(containerRef);

  return (
    <>
      <Header />
      <Container ref={containerRef}>
        <ThumbnailImage />
        <Grid handleZoom={handleZoom} />
      </Container>
      <Footer />
    </>
  );
}
