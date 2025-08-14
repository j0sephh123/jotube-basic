import { imagesBasePath } from "@/shared/utils/image";

export const generateMainThumbnailUrl = (
  ytChannelId: string,
  ytVideoId: string,
  index: number,
  cacheBuster?: number
): string =>
  `${imagesBasePath}/${ytChannelId}/${ytVideoId}/thumbnails/${index}.png${
    cacheBuster ? `?v=${cacheBuster}` : ""
  }`;
