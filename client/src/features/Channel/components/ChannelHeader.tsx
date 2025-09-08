/* eslint-disable boundaries/element-types */
/* eslint-disable import/no-internal-modules */
import { GenericHeaderContainer } from "@widgets/GenericHeaderContainer";
import {
  ChannelHeaderTitleSection,
  ChannelHeaderCombinedActions,
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
      topRight={
        <ChannelHeaderCombinedActions
          ytChannelId={ytChannelId}
          channelId={channelId}
        />
      }
      bottomLeft={<ChannelHeaderControls />}
    />
  );
};
