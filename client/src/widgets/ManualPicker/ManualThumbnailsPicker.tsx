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
import { makeYtChannelId, To } from "@shared/types";

export function ManualThumbnailsPicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { items: thumbnailsProcessingData } = useThumbnailsProcessingState();

  const ytChannelId = thumbnailsProcessingData[0]?.ytChannelId ?? "";
  const ytVideoId = thumbnailsProcessingData[0]?.ytVideoId ?? "";

  const handleZoom = (index: number): void => {
    const url = generateThumbnailUrl(ytChannelId, ytVideoId, index);
    setZoom(url);
    setSelectedImages((prev) => [...prev, index]);
  };

  const handleKeyDown = useHandleKeyDown();
  const handleContainerWheel = useHandleContainerWheel();

  useEvents(handleKeyDown, handleContainerWheel, containerRef);
  useResetSelection(containerRef);

  const channelLink: To = `/channels/${makeYtChannelId(ytChannelId)}/saved`;
  const videoLabel = `Video: ${ytVideoId ?? ""}`;

  return (
    <>
      <Header channelLink={channelLink} videoLabel={videoLabel} />
      <Container ref={containerRef}>
        <ThumbnailImage />
        <Grid handleZoom={handleZoom} />
      </Container>
      <Footer />
    </>
  );
}
