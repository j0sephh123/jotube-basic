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
  videosDashboardViewType,
}: {
  video: DashboardVideoResponse;
  videosDashboardViewType: string;
}) {
  const titleNavigate =
    `/channels/${video.channelYtId}/videos/${video.ytId}` as To;

  const isScreenshots = videosDashboardViewType === "screenshots";
  const isSaved = videosDashboardViewType === "saved";
  const isThumbnails = videosDashboardViewType === "thumbnails";
  const isStoryboards = videosDashboardViewType === "storyboards";

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

    if (isScreenshots) {
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
        isScreenshots ? video.screenshotCount : undefined
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
