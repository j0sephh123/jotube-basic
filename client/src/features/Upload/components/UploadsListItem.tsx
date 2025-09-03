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
import { Button, Card } from "@shared/ui";
import { makeYtChannelId, makeYtVideoId } from "@shared/types";
import { ViewVideoThumbnails } from "@features/Thumbnails";
import { type UploadsType } from "../types";
import { setGalleryModal } from "@features/Gallery";
import { useScreenshotsForCarousel } from "@features/Screenshot";

type Props = {
  upload: UploadsListQuery["uploadsList"]["uploads"][0];
  ytChannelId: string;
  type: UploadsType;
  handleSideEffect: () => void;
  channelTitleSlot?: ReactNode;
};

export function UploadsListItem({
  upload: { id, ytId, title, publishedAt, duration, src },
  ytChannelId,
  type,
  handleSideEffect,
  channelTitleSlot,
}: Props) {
  const handleGalleryClick = () => {
    setGalleryModal({
      ytVideoId: ytId,
      ytChannelIds: [ytChannelId],
    });
  };

  const handleViewScreenshots = useScreenshotsForCarousel(ytId);

  return (
    <Card.Container>
      <div className="relative group">
        <VideoPlayer
          ytId={ytId}
          src={src}
          id={id}
          title={title}
          duration={duration}
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <Card.Menu id={id} ytId={ytId} />
        </div>
      </div>
      <Card.Content>
        <Card.Title
          title={title}
          to={`/channels/${makeYtChannelId(ytChannelId)}/videos/${makeYtVideoId(
            ytId
          )}`}
        />
        <div className="flex justify-between gap-4 items-center">
          {channelTitleSlot}
          <PublishedTimeAgo date={publishedAt} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {type === "default" && (
              <>
                <SaveUpload
                  ytVideoId={ytId}
                  ytChannelId={ytChannelId}
                  handleSideEffect={handleSideEffect}
                />
                <DownloadStoryboard
                  ytVideoId={ytId}
                  ytChannelId={ytChannelId}
                  handleSideEffect={handleSideEffect}
                />
                <DeleteUpload
                  handleSideEffect={handleSideEffect}
                  ytChannelId={ytChannelId}
                  ytVideoIds={[ytId]}
                />
              </>
            )}
            {type === "saved" && (
              <>
                <DownloadUpload
                  ytChannelId={ytChannelId}
                  handleSideEffect={handleSideEffect}
                  ytVideoId={ytId}
                />
                <DeleteUpload
                  handleSideEffect={handleSideEffect}
                  ytChannelId={ytChannelId}
                  ytVideoIds={[ytId]}
                />
              </>
            )}
            {type === "thumbnails" && (
              <ViewVideoThumbnails
                ytChannelId={ytChannelId}
                ytVideoId={ytId}
                channelTitle={title}
              />
            )}
            {type === "screenshots" && (
              <>
                <Button onClick={handleGalleryClick}>Gallery</Button>
                <Button onClick={() => handleViewScreenshots([ytChannelId])}>
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
