/* eslint-disable import/no-internal-modules */
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";
import { useRef, useEffect } from "react";
import { useRecentlyViewedChannels } from "./useRecentlyViewedChannels";

export function useAddToRecentlyViewed(channelId: number, ytChannelId: string) {
  const { data: channelMetadata } = useChannelMetadataQuery(channelId);
  const { add } = useRecentlyViewedChannels();
  const hasAddedRef = useRef(false);

  useEffect(() => {
    if (channelMetadata && !hasAddedRef.current) {
      hasAddedRef.current = true;
      add({
        id: channelMetadata.id,
        ytId: ytChannelId,
        title: channelMetadata.title,
      });
    }
  }, [channelMetadata, add, ytChannelId]);
}
