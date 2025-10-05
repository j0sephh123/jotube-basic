/* eslint-disable import/no-internal-modules */
import { ChannelHeader } from "@features/Channel/components/ChannelHeader";
import { YtIdToId } from "@shared/hoc";   
import { useAddToRecentlyViewed } from "@features/Channel/hooks";

export const ChannelPageLayoutInner = ({
  channelId,
  ytChannelId,
  children,
}: {
  channelId: number;
  ytChannelId: string;
  children: React.ReactNode;
}) => {
  useAddToRecentlyViewed(channelId, ytChannelId);

  return (
    <div className="px-4 py-2">
      <ChannelHeader channelId={channelId} ytChannelId={ytChannelId} />
      {children}
    </div>
  );
};

export const ChannelPageLayout = YtIdToId(ChannelPageLayoutInner);
