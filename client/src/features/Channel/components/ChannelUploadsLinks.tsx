/* eslint-disable import/no-internal-modules */
import { TabsLinksIterator } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import { useTypedParams } from "@shared/hooks";
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";
import { useMemo } from "react";

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

  const items = useMemo(
    () => [
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
    ],
    [
      savedArtifactsCount,
      screenshotArtifactsCount,
      thumbnailArtifactsCount,
      videoArtifactsCount,
    ]
  );

  return (
    <TabsLinksIterator
      baseLink={`/channels/${makeYtChannelId(ytChannelId)}`}
      label="uploads"
      items={items}
      getActive={(name: string) => uploadsType === name}
    />
  );
};
