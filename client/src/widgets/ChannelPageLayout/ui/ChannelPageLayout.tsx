
import { ChannelHeader } from "@widgets/ChannelHeader";
import { YtIdToId } from "@shared/hoc";   
import { useAddToRecentlyViewed } from "@features/Channel";

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
    <div className="container mx-auto px-4 py-2">
      <ChannelHeader channelId={channelId} ytChannelId={ytChannelId} />
      {children}
    </div>
  );
};

export const ChannelPageLayout = YtIdToId(ChannelPageLayoutInner);
