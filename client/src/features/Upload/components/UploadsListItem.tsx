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
  processingStatus: "none" | "processing" | "storyboarding";
  processingState: "active" | "waiting";
  onProcessingCancel: () => void;
  processingType?: "download" | "storyboarding" | "processing";
  onCardClick?: (id: string) => void;
  isSelected?: boolean;
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
  processingStatus = "none",
  processingState,
  onProcessingCancel,
  processingType,
  onCardClick,
  isSelected = false,
}: UploadsListItemProps) {
  const handleGalleryClick = () => {
    setGalleryModal({
      collectionItemId: ytId,
      collectionIds: [channelId],
    });
  };
  const isScreenshots = uploadsType === "screenshots";

  const handleViewScreenshots = useScreenshotsForCarousel(ytId);

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(ytId);
    }
  };

  const getOverlayClasses = () => {
    if (processingStatus === "processing") {
      return processingState === "active"
        ? "border-4 border-orange-500 group-hover:bg-orange-500/50"
        : "border-4 border-orange-500 group-hover:bg-orange-500/50";
    }
    if (processingStatus === "storyboarding") {
      return processingState === "active"
        ? "border-4 border-pink-500 group-hover:bg-pink-500/50"
        : "border-4 border-pink-500 group-hover:bg-pink-500/50";
    }
    return "";
  };

  const getOverlayText = () => {
    if (processingStatus === "processing") {
      return processingState === "active" ? "Processing..." : "Processing...";
    }
    if (processingStatus === "storyboarding") {
      return processingState === "active"
        ? "Creating Storyboard..."
        : "Creating Storyboard...";
    }
    return "";
  };

  return (
    <div
      onClick={handleCardClick}
      className={`${isSelected ? "border-2 border-blue-500" : ""}`}
    >
      <Card.Container
        className={`relative group cursor-pointer ${
          processingStatus !== "none" ? "pointer-events-none" : ""
        }`}
      >
        <div className="relative">
          {!isScreenshots && (
            <VideoPlayer ytId={ytId} src={src} id={id} title={title} />
          )}
          {isScreenshots && <img src={src} alt={title} />}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <div
              className={`rounded-full p-1.5 shadow-lg ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
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
              <CustomLink
                to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}
              >
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
                    ytVideoIds={[ytId]}
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
        {processingStatus !== "none" && (
          <>
            <div
              className={`absolute inset-0 ${getOverlayClasses()} transition-all duration-200 z-20 pointer-events-auto`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="text-center text-white">
                  <div className="text-lg font-semibold mb-2">
                    {getOverlayText()}
                  </div>
                  {processingState === "waiting" && (
                    <Button
                      onClick={onProcessingCancel}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute top-2 left-2 z-30 flex gap-2">
              <div
                className={`px-2 py-1 rounded text-xs font-medium ${
                  processingState === "active"
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {processingState === "active" ? "Active" : "Waiting"}
              </div>
              <div className="px-2 py-1 rounded text-xs font-medium bg-blue-500 text-white">
                {processingType}
              </div>
            </div>
          </>
        )}
      </Card.Container>
    </div>
  );
}
