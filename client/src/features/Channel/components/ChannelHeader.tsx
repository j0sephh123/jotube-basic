/* eslint-disable boundaries/element-types */
/* eslint-disable import/no-internal-modules */
import { GenericHeaderContainer } from "@widgets/GenericHeaderContainer";
import {
  ChannelHeaderTitleSection,
  ChannelHeaderActions,
  ChannelHeaderUploadsLinks,
  ChannelHeaderControls,
} from "@features/Channel/components";

export const ChannelHeader = ({
  channelId,
  ytChannelId,
}: {
  channelId: number;
  ytChannelId: string;
}) => {
  return (
    <GenericHeaderContainer
      topLeft={
        <ChannelHeaderTitleSection
          ytChannelId={ytChannelId}
          channelId={channelId}
        />
      }
      topRight={<ChannelHeaderActions channelId={channelId} />}
      bottomLeft={<ChannelHeaderControls />}
      bottomRight={
        <ChannelHeaderUploadsLinks
          ytChannelId={ytChannelId}
          channelId={channelId}
        />
      }
    />
  );
};
