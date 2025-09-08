import { getPublicImgUrl } from "@shared/utils";
import { useMemo } from "react";

export function useSavedScreenshot(
  screenshots: {
    ytVideoId: string;
    second: number;
  }[] | undefined,
  ytChannelId: string | undefined,
  ytId: string,
  src: string,
  screenshotIndex: number
) {
  return useMemo(() => {
    if (
      screenshots &&
      screenshots.length &&
      screenshots.length > 0 &&
      screenshots[0]?.ytVideoId
    ) {
      return getPublicImgUrl(
        ytChannelId || ytId,
        screenshots[screenshotIndex]?.ytVideoId || "0",
        screenshots[screenshotIndex]?.second || 0,
        "saved_screenshots"
      );
    }

    return src;
  }, [screenshots, screenshotIndex, ytChannelId, ytId, src]);
}
