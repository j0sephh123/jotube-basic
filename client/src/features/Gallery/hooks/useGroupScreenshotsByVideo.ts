import { type ChannelScreenshot } from "@features/Screenshot";
import { useMemo } from "react";

export function useGroupScreenshotsByVideo(
  screenshots: ChannelScreenshot[] | undefined
) {
  return useMemo(() => {
    if (!screenshots) return [];
    const groups = new Map<string, typeof screenshots>();
    screenshots.forEach((screenshot) => {
      const videoId = screenshot.ytVideoId;
      if (!groups.has(videoId)) {
        groups.set(videoId, []);
      }
      groups.get(videoId)!.push(screenshot);
    });
    return Array.from(groups.entries()).map(([videoId, videoScreenshots]) => ({
      videoId,
      screenshots: videoScreenshots,
    }));
  }, [screenshots]);
}
