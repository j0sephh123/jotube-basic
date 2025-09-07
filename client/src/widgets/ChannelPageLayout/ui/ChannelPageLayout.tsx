import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ChannelHeader } from "@widgets/ChannelHeader";
import { useRecentlyViewedChannels } from "@features/Channel";
import { YtIdToId } from "@shared/hoc";
// eslint-disable-next-line import/no-internal-modules
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";

export const ChannelPageLayoutInner = ({
  channelId,
  ytChannelId,
}: {
  channelId: number;
  ytChannelId: string;
}) => {
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

  return (
    <div className="container mx-auto px-4 py-2">
      <ChannelHeader />
      <Outlet />
    </div>
  );
};

export const ChannelPageLayout = YtIdToId(ChannelPageLayoutInner);
