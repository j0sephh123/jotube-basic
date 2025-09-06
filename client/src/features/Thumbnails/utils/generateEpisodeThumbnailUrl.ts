import { imagesBasePath } from "@shared/utils";

export const generateEpisodeThumbnailUrl = (
  tvIdentifier: string,
  episodeIdentifier: string,
  index: number
): string =>
  `${imagesBasePath}/${tvIdentifier}/${episodeIdentifier}/thumbnails/${index}.png`;

export const generateEpisodeMainThumbnailUrl = (
  tvIdentifier: string,
  episodeIdentifier: string,
  index: number
): string =>
  `${imagesBasePath}/${tvIdentifier}/${episodeIdentifier}/thumbnails/${index}.png`;
