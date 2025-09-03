import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ChannelHeader } from "@widgets/ChannelHeader";
import { Grid } from "@widgets/Grid";
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
  const pathname = useLocation().pathname;
  const isGallery = pathname.includes("gallery");
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
      {isGallery ? (
        <Outlet />
      ) : (
        <Grid cols={3}>
          <Outlet />
        </Grid>
      )}
    </div>
  );
};

export const ChannelPageLayout = YtIdToId(ChannelPageLayoutInner);
