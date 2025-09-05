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
  generateMainThumbnailUrl,
} from "@features/Thumbnails";
import { setZoom } from "@features/Screenshot";
import { setSelectedImages, useThumbnailsProcessingState } from "@shared/store";
import { generateThumbnailUrl } from "@shared/utils";
import { useRef } from "react";
import { makeYtChannelId, type To } from "@shared/types";
import { OpenDirectoryButton } from "@shared/ui";

export function ManualThumbnailsPicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { items: thumbnailsProcessingData, currentIndex } =
    useThumbnailsProcessingState();

  const ytChannelId = thumbnailsProcessingData[0]?.ytChannelId ?? "";
  const ytVideoId = thumbnailsProcessingData[0]?.ytVideoId ?? "";

  const src = generateMainThumbnailUrl(ytChannelId, ytVideoId, currentIndex);

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
        <ThumbnailImage src={src} />
        <Grid handleZoom={handleZoom} />
      </Container>
      <Footer
        slot={
          <OpenDirectoryButton
            collection={thumbnailsProcessingData[0]?.ytChannelId ?? ""}
            media={thumbnailsProcessingData[0]?.ytVideoId ?? ""}
          />
        }
      />
    </>
  );
}
