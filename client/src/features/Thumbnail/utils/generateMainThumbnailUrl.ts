import { imagesBasePath } from "@/shared/utils/image";

export const generateMainThumbnailUrl = (
  ytChannelId: string,
  ytVideoId: string,
  index: number
): string =>
  `${imagesBasePath}/${ytChannelId}/${ytVideoId}/thumbnails/${index}.png`;
