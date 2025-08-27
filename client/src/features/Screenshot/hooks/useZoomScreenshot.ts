import { useCallback } from "react";
import { type ChannelScreenshot } from "./useFetchChannelScreenshots";
import { useZoomStore } from "./useZoomStore";

export function useZoomScreenshot() {
  const { setZoom, closeZoom } = useZoomStore();

  return useCallback(
    (screenshot: ChannelScreenshot) => {
      setZoom(true, screenshot.src, closeZoom);
    },
    [setZoom, closeZoom]
  );
}
