import { useCallback } from "react";
import { type ChannelScreenshot } from "./useFetchChannelScreenshots";
import { setZoom, closeZoom } from "@features/Screenshot";

export function useZoomScreenshot() {
  return useCallback(
    (screenshot: ChannelScreenshot) => {
      setZoom(true, screenshot.src, closeZoom);
    },
    []
  );
}
