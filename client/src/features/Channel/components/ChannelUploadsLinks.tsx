import { CustomLink } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import clsx from "clsx";

interface BottomRightProps {
  ytChannelId: string;
  isUploadsPage: boolean;
  isSavedPage: boolean;
  isThumbnailsPage: boolean;
  isScreenshotsPage: boolean;
  isGalleryPage: boolean;
  videoArtifactsCount: number;
  savedArtifactsCount: number;
  thumbnailArtifactsCount: number;
  screenshotArtifactsCount: number;
}

export const ChannelUploadsLinks = ({
  ytChannelId,
  isUploadsPage,
  isSavedPage,
  isThumbnailsPage,
  isScreenshotsPage,
  isGalleryPage,
  videoArtifactsCount,
  savedArtifactsCount,
  thumbnailArtifactsCount,
  screenshotArtifactsCount,
}: BottomRightProps) => {
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
