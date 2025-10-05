/* eslint-disable boundaries/element-types */
/* eslint-disable import/no-internal-modules */
import { GenericHeaderContainer } from "@widgets/GenericHeaderContainer";
import {
  ChannelHeaderTitleSection,
  ChannelHeaderCombinedActions,
  ChannelHeaderControls,
} from "@features/Channel/components";
import { useUploads } from "@features/Upload";
import { IdType } from "@shared/api";
import { useTypedParams } from "@shared/hooks";
import { type UploadsType } from "@shared/types";

export const ChannelHeader = ({
  channelId,
  ytChannelId,
}: {
  channelId: number;
  ytChannelId: string;
}) => {
  const uploadsType = useTypedParams("uploadsType") as UploadsType;

  const { data: uploadsData } = useUploads({
    id: { type: IdType.Channel, value: channelId },
    uploadsType,
  });

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
      bottomLeft={<ChannelHeaderControls uploadsData={uploadsData} />}
    />
  );
};
