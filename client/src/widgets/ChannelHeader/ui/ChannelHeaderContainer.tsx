import { ChannelHeader } from "./index";
import {
  ChannelTitleSection,
  ChannelActions,
  ChannelUploadsLinks,
  ChannelControls,
} from "@features/Channel";

export const ChannelHeaderContainer = ({
  channelId,
  ytChannelId,
}: {
  channelId: number;
  ytChannelId: string;
}) => {
  return (
    <ChannelHeader
      topLeft={
        <ChannelTitleSection ytChannelId={ytChannelId} channelId={channelId} />
      }
      topRight={<ChannelActions channelId={channelId} />}
      bottomLeft={<ChannelControls />}
      bottomRight={
        <ChannelUploadsLinks ytChannelId={ytChannelId} channelId={channelId} />
      }
    />
  );
};
