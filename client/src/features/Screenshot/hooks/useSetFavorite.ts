import {
  type ChannelScreenshot,
  useRefetchChannelScreenshots,
} from "./useFetchChannelScreenshots";
import { useUpdateChannelScreenshot } from "./useUpdateChannelScreenshot";
import { useCallback } from "react";

export function useSetFavorite() {
  const refetchChannelScreenshots = useRefetchChannelScreenshots();
  const updateScreenshot = useUpdateChannelScreenshot();

  return useCallback(
    (screenshot: ChannelScreenshot) => {
      updateScreenshot
        .mutateAsync({
          id: screenshot.id,
          isFav: !screenshot.isFav,
        })
        .then(() => {
          refetchChannelScreenshots();
        });
    },
    [refetchChannelScreenshots, updateScreenshot]
  );
}
