import { generateThumbnailUrl } from "@features/Thumbnails";
import {
  useEvents,
  useHandleContainerWheel,
  useHandleKeyDown,
  useResetSelection,
  Footer,
} from "@features/Episode";
import { setZoom } from "@features/Screenshot";
import { setSelectedImages, useEpisodesProcessingState } from "@shared/store";
import { useRef } from "react";
import { OpenDirectoryButton, Container, ThumbnailImage } from "@shared/ui";
import { type To } from "@shared/types";
import { generateEpisodeZoomImageUrl } from "@shared/utils";
import Grid from "./Grid";
import Header from "./Header";

export function EpisodesPicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { items: episodesProcessingData, currentIndex } =
    useEpisodesProcessingState();

  const tvIdentifier = episodesProcessingData[0]?.tvIdentifier ?? "";
  const episodeIdentifier = episodesProcessingData[0]?.episodeIdentifier ?? "";

  const src = generateThumbnailUrl(
    tvIdentifier,
    episodeIdentifier,
    currentIndex
  );

  const handleZoom = (index: number): void => {
    const url = generateEpisodeZoomImageUrl(
      tvIdentifier,
      episodeIdentifier,
      index
    );
    setZoom(url);
    setSelectedImages((prev) => [...prev, index]);
  };

  const handleKeyDown = useHandleKeyDown();
  const handleContainerWheel = useHandleContainerWheel();

  useEvents(handleKeyDown, handleContainerWheel, containerRef);
  useResetSelection(containerRef);

  const tvLink = `/tv/${tvIdentifier}`;
  const episodeLabel = `Episode: ${episodeIdentifier ?? ""}`;

  return (
    <>
      <Header channelLink={tvLink as To} videoLabel={episodeLabel} />
      <Container ref={containerRef}>
        <ThumbnailImage src={src} />
        <Grid handleZoom={handleZoom} />
      </Container>
      <Footer
        slot={
          <OpenDirectoryButton
            collection={episodesProcessingData[0]?.tvIdentifier ?? ""}
            media={episodesProcessingData[0]?.episodeIdentifier ?? ""}
          />
        }
      />
    </>
  );
}
