import { useCallback } from "react";
import { type ChannelScreenshot } from "./useFetchChannelScreenshots";
import { setZoom } from "@features/Screenshot";

export function useZoomScreenshot() {
  return useCallback((screenshot: ChannelScreenshot) => {
    setZoom(screenshot.src);
  }, []);
}
