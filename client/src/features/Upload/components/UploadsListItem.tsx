import { type ReactNode } from "react";
import {
  DeleteUpload,
  PublishedTimeAgo,
  SaveUpload,
  DownloadStoryboard,
  DownloadUpload,
  VideoPlayer,
} from "@features/Upload";
import { type UploadsListQuery } from "@shared/api";
import { Button, Card, CustomLink } from "@shared/ui";
import { makeYtChannelId, makeYtVideoId } from "@shared/types";
import { ViewVideoThumbnails } from "@features/Thumbnails";
import { type UploadsType } from "@shared/types";
import { setGalleryModal } from "@features/Gallery";
import { useScreenshotsForCarousel } from "@features/Screenshot";

export type UploadsListItemProps = {
  upload: UploadsListQuery["uploadsList"][0];
  uploadsType: UploadsType;
  handleSideEffect: () => void;
  channelTitleSlot?: ReactNode;
};

export function UploadsListItem({
  upload: {
    id,
    ytId,
    title,
    publishedAt,
    src,
    channelId,
    channelTitle,
    ytChannelId,
    screenshotCount,
    dateAdded,
  },
  uploadsType,
  handleSideEffect,
}: UploadsListItemProps) {
  const handleGalleryClick = () => {
    setGalleryModal({
      collectionItemId: ytId,
      collectionIds: [channelId],
    });
  };
  const isScreenshots = uploadsType === "screenshots";

  const handleViewScreenshots = useScreenshotsForCarousel(ytId);

  return (
    <Card.Container>
      <div className="relative group">
        {!isScreenshots && (
          <VideoPlayer ytId={ytId} src={src} id={id} title={title} />
        )}
        {isScreenshots && <img src={src} alt={title} />}
        {!isScreenshots && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <Card.Menu id={id} ytId={ytId} />
          </div>
        )}
      </div>
      <Card.Content>
        {!isScreenshots ? (
          <Card.Title
            title={title}
            to={`/channels/${makeYtChannelId(
              ytChannelId
            )}/videos/${makeYtVideoId(ytId)}`}
          />
        ) : (
          <div className="text-base font-medium text-gray-200 hover:text-blue-400 hover:underline transition-colors truncate cursor-pointer max-w-[140px]">
            {title}
          </div>
        )}
        <div className="flex justify-between gap-4 items-center">
          {!isScreenshots && channelTitle && (
            <CustomLink to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}>
              <div className="text text-gray-400">{channelTitle}</div>
            </CustomLink>
          )}
          {isScreenshots && (
            <div className="text text-gray-400">
              {screenshotCount} screenshots •{" "}
              {dateAdded && new Date(dateAdded).toLocaleDateString()}
            </div>
          )}
          <PublishedTimeAgo date={publishedAt} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {uploadsType === "default" && (
              <>
                <SaveUpload
                  ytVideoId={ytId}
                  handleSideEffect={handleSideEffect}
                />
                <DownloadStoryboard
                  ytVideoId={ytId}
                  handleSideEffect={handleSideEffect}
                />
                <DeleteUpload
                  handleSideEffect={handleSideEffect}
                  channelId={channelId}
                  ytVideoIds={[ytId]}
                />
              </>
            )}
            {uploadsType === "saved" && (
              <>
                <DownloadUpload
                  channelId={channelId}
                  handleSideEffect={handleSideEffect}
                  ytVideoId={ytId}
                />
                <DeleteUpload
                  handleSideEffect={handleSideEffect}
                  channelId={channelId}
                  ytVideoIds={[ytId]}
                />
              </>
            )}
            {uploadsType === "thumbnails" && (
              <ViewVideoThumbnails
                ytChannelId={ytChannelId}
                videoId={id}
                channelTitle={title}
                ytVideoId={ytId}
              />
            )}
            {uploadsType === "screenshots" && (
              <>
                <Button onClick={handleGalleryClick}>Gallery</Button>
                <Button onClick={() => handleViewScreenshots([channelId])}>
                  Screenshots
                </Button>
              </>
            )}
          </div>
        </div>
      </Card.Content>
    </Card.Container>
  );
}
