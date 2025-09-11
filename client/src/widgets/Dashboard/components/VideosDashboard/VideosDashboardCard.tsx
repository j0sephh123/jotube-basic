import {
  type UploadsWithThumbnailsResponse,
  type DashboardVideoResponse,
} from "@shared/api";
import { type To } from "@shared/types";
import { Card } from "@shared/ui";
import VideoChannelInfo from "./VideoChannelInfo";
import { DeleteUpload, DownloadUpload, VideoPlayer } from "@features/Upload";
import { setGalleryModal } from "@features/Gallery";
import { setProcessingData } from "@shared/store";

export function VideosDashboardCard({
  video,
  viewType,
}: {
  video: DashboardVideoResponse;
  viewType: string;
}) {
  const titleNavigate =
    `/channels/${video.channelYtId}/videos/${video.ytId}` as To;

  const isProcessed = viewType === "processed";
  const isSaved = viewType === "saved";
  const isThumbnails = viewType === "thumbnails";
  const isStoryboards = viewType === "storyboards";

  const handleThumbnailClick = (video: DashboardVideoResponse) => {
    if (isThumbnails) {
      setProcessingData("thumbnails", [
        {
          ytChannelId: video.channelYtId,
          channelTitle: video.channelTitle,
          videoId: video.id,
          ytVideoId: video.ytId,
        },
      ] as UploadsWithThumbnailsResponse[]);
    }
    if (isStoryboards) {
      // TODO
    }

    if (isProcessed) {
      setGalleryModal({
        ytVideoId: video.ytId,
        channelIds: [video.channelId],
      });
    }
  };

  return (
    <Card
      id={video.id}
      ytId={video.ytId}
      title={video.title}
      src={video.src}
      onThumbnailClick={() => handleThumbnailClick(video)}
      to={titleNavigate}
      secondRow={
        <VideoChannelInfo
          channelTitle={`${video.channelTitle} (${video.screenshotCount})`}
          channelYtId={video.channelYtId}
        />
      }
      cardMenuSlot={<Card.Menu id={video.id} ytId={video.ytId} />}
      cardImageSlot={
        isSaved && (
          <VideoPlayer
            ytId={video.ytId}
            src={video.src}
            id={video.id}
            title={video.title}
          />
        )
      }
      featuredScreenshotsLength={
        isProcessed ? video.screenshotCount : undefined
      }
      downloadButtonSlot={
        isSaved && (
          <DownloadUpload
            channelId={video.channelId}
            handleSideEffect={() => {}}
            ytVideoId={video.ytId}
          />
        )
      }
      deleteButtonSlot={
        isSaved && (
          <DeleteUpload
            handleSideEffect={() => {}}
            channelId={video.channelId}
            ytVideoIds={[video.ytId]}
          />
        )
      }
    />
  );
}
