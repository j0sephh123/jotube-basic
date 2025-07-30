// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const imagesBasePath = `${
  import.meta.env.VITE_VIDEO_SERVICE_URL
}/images/`;

export const getPublicImgUrl = (
  ytChannelId: string,
  ytVideoId: string,
  seconds: number,
  type: "saved_screenshots" | "all_screenshots"
): string =>
  `${imagesBasePath}${ytChannelId}/${ytVideoId}/${type}/${ytVideoId}-${seconds}.png`;

export function generateChannelAvatarUrl(
  ytChannelId: string,
  uniqueId: string
): string {
  return `${imagesBasePath}${ytChannelId}/avatar.png?${uniqueId}`;
}

export const generateThumbnailUrl = (
  ytChannelId: string,
  ytVideoId: string,
  index: number
): string =>
  `${imagesBasePath}/${ytChannelId}/${ytVideoId}/all_screenshots/${ytVideoId}-${index}.png`;
