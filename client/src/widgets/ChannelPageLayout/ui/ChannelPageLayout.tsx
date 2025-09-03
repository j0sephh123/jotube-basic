import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { ChannelHeader } from "@widgets/ChannelHeader";
import { Grid } from "@widgets/Grid";
import { useRecentlyViewedChannels } from "@features/Channel";
import { useChannelMetadataQuery } from "@entities/Channel";
import { useTypedParams } from "@shared/hooks";

export default function ChannelPageLayout() {
  const ytChannelId = useTypedParams("ytChannelId");
  const { data: channelMetadata } = useChannelMetadataQuery(ytChannelId);
  const { add } = useRecentlyViewedChannels();

  useEffect(() => {
    if (channelMetadata) {
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
      <Grid cols={3}>
        <Outlet />
      </Grid>
    </div>
  );
}
