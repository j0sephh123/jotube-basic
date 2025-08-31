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
import { useRef } from "react";

export function ManualThumbnailsPicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useHandleKeyDown();
  const handleContainerWheel = useHandleContainerWheel();

  useEvents(handleKeyDown, handleContainerWheel, containerRef);
  useResetSelection(containerRef);

  return (
    <>
      <Header />
      <Container ref={containerRef}>
        <ThumbnailImage />
        <Grid />
      </Container>
      <Footer />
    </>
  );
}
