import { imagesBasePath } from "@shared/utils";

export const generateThumbnailUrl = (
  ytChannelId: string,
  ytVideoId: string,
  index: number
): string =>
  `${imagesBasePath}/${ytChannelId}/${ytVideoId}/thumbnails/${index}.png`;
