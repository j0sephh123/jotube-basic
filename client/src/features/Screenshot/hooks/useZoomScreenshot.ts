import { useCallback } from "react";
import { type ChannelScreenshot } from "./useFetchChannelScreenshots";
import { useZoom } from "@app/providers/store/store-hooks";

export function useZoomScreenshot() {
  const { setZoom, closeZoom } = useZoom();

  return useCallback(
    (screenshot: ChannelScreenshot) => {
      setZoom(true, screenshot.src, closeZoom);
    },
    [setZoom, closeZoom]
  );
}
