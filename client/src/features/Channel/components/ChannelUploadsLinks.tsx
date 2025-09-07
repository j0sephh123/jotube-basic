/* eslint-disable import/no-internal-modules */
import { CustomLink } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import clsx from "clsx";
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

  const isUploadsPage = uploadsType === "default";
  const isSavedPage = uploadsType === "saved";
  const isThumbnailsPage = uploadsType === "thumbnails";
  const isScreenshotsPage = uploadsType === "screenshots";
  const isGalleryPage = uploadsType === "gallery";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-base-content/70">uploads</span>
      <div className="tabs tabs-boxed bg-base-100">
        <CustomLink
          to={`/channels/${makeYtChannelId(ytChannelId)}`}
          className={clsx("tab tab-sm", {
            "tab-active bg-primary text-primary-content": isUploadsPage,
          })}
        >
          Uploads ({videoArtifactsCount})
        </CustomLink>
        <CustomLink
          to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}
          className={clsx("tab tab-sm", {
            "tab-active bg-primary text-primary-content": isSavedPage,
          })}
        >
          Saved ({savedArtifactsCount})
        </CustomLink>
        <CustomLink
          to={`/channels/${makeYtChannelId(ytChannelId)}/thumbnails`}
          className={clsx("tab tab-sm", {
            "tab-active bg-primary text-primary-content": isThumbnailsPage,
          })}
        >
          Thumbnails ({thumbnailArtifactsCount})
        </CustomLink>
        <CustomLink
          to={`/channels/${makeYtChannelId(ytChannelId)}/screenshots`}
          className={clsx("tab tab-sm", {
            "tab-active bg-primary text-primary-content": isScreenshotsPage,
          })}
        >
          Screenshots ({screenshotArtifactsCount})
        </CustomLink>
        <CustomLink
          to={`/channels/${makeYtChannelId(ytChannelId)}/gallery`}
          className={clsx("tab tab-sm", {
            "tab-active bg-primary text-primary-content": isGalleryPage,
          })}
        >
          Gallery
        </CustomLink>
      </div>
    </div>
  );
};
