/* eslint-disable import/no-internal-modules */
import { Iterator } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import { useTypedParams } from "@shared/hooks";
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";

interface BottomRightProps {
  ytChannelId: string;
  channelId: number;
}

export const ChannelHeaderUploadsLinks = ({
  ytChannelId,
  channelId,
}: BottomRightProps) => {
  const uploadsType = useTypedParams("uploadsType");
  const { data: channelMetadata } = useChannelMetadataQuery(channelId);

  const {
    screenshotArtifactsCount,
    thumbnailArtifactsCount,
    videoArtifactsCount,
    savedArtifactsCount,
  } = channelMetadata || {
    screenshotArtifactsCount: 0,
    thumbnailArtifactsCount: 0,
    videoArtifactsCount: 0,
    savedArtifactsCount: 0,
  };

  return (
    <Iterator
      baseLink={`/channels/${makeYtChannelId(ytChannelId)}`}
      items={[
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
      ]}
      getActive={(name: string) => uploadsType === name}
    />
  );
};
