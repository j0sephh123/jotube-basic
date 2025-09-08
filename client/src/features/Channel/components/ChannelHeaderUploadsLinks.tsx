/* eslint-disable import/no-internal-modules */
import { Iterator } from "@shared/ui";
import { makeYtChannelId, UploadsType } from "@shared/types";
import { useTypedParams } from "@shared/hooks";
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";
import { useMemo } from "react";

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

  const items = useMemo<{ name: UploadsType; count: number }[]>(
    () => [
      {
        name: "default",
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
    <Iterator
      baseLink={`/channels/${makeYtChannelId(ytChannelId)}`}
      items={items}
      getActive={(name: string) => uploadsType === name}
      variant="link"
    />
  );
};
