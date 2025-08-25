import { useCallback } from "react";
import { type ChannelScreenshot } from "./useFetchChannelScreenshots";
import { useZoom } from "./useZoom";

export function useZoomScreenshot() {
  const { setZoom, closeZoom } = useZoom();

  return useCallback(
    (index: number, screenshots: ChannelScreenshot[]) => {
      const screenshot = screenshots?.[index];
      if (screenshot) {
        setZoom(true, screenshot.src, closeZoom);
      }
    },
    [setZoom, closeZoom]
  );
}
