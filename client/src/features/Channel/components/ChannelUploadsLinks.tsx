/* eslint-disable import/no-internal-modules */
import { TabsLinksIterator } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import { useTypedParams } from "@shared/hooks";
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";

interface BottomRightProps {
  ytChannelId: string;
  channelId: number;
}

export const ChannelUploadsLinks = ({
  ytChannelId,
  channelId,
}: BottomRightProps) => {
  const uploadsType = useTypedParams("uploadsType");
  const { data: channelMetadata } = useChannelMetadataQuery(channelId);

  if (!channelMetadata) return null;

  const {
    screenshotArtifactsCount,
    thumbnailArtifactsCount,
    videoArtifactsCount,
    savedArtifactsCount,
  } = channelMetadata;

  const items = [
    {
      name: "uploads",
      count: videoArtifactsCount,
    },
    {
      name: "saved",
      count: savedArtifactsCount,
    },
    {
      name: "thumbnails",
      count: thumbnailArtifactsCount,
    },
    {
      name: "screenshots",
      count: screenshotArtifactsCount,
    },
    {
      name: "gallery",
      count: screenshotArtifactsCount,
    },
  ];

  return (
    <TabsLinksIterator
      baseLink={`/channels/${makeYtChannelId(ytChannelId)}`}
      label="uploads"
      items={items}
      getActive={(name: string) => uploadsType === name}
    />
  );
};
