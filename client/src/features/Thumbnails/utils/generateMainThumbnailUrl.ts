import { imagesBasePath } from "@shared/utils";

export const generateMainThumbnailUrl = (
  ytChannelId: string,
  ytVideoId: string,
  index: number
): string =>
  `${imagesBasePath}/${ytChannelId}/${ytVideoId}/thumbnails/${index}.png`;
