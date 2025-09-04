import { Card } from "@shared/ui";
import { VideosDashboardContainer, VideoChannelInfo } from "@widgets/Dashboard";
import { type DashboardVideoResponse } from "@shared/api";
import { setGalleryModal } from "@features/Gallery";
import { makeYtChannelId, makeYtVideoId } from "@shared/types";

export default function VideosDashboard() {
  const handleThumbnailClick = (video: DashboardVideoResponse) => {
    setGalleryModal({
      ytVideoId: video.ytId,
      channelIds: [video.channelId],
    });
  };

  return (
    <VideosDashboardContainer>
      {(videos) => (
        <>
          {videos.map((video) => (
            <Card
              key={video.id}
              featuredScreenshotsLength={video.screenshotCount}
              id={video.id}
              ytId={video.ytId}
              title={video.title}
              src={video.src}
              onThumbnailClick={() => handleThumbnailClick(video)}
              to={`/channels/${makeYtChannelId(
                video.channelYtId
              )}/gallery/${makeYtVideoId(video.ytId)}`}
              secondRow={
                <VideoChannelInfo
                  channelTitle={`${video.channelTitle} (${video.screenshotCount})`}
                  channelYtId={video.channelYtId}
                />
              }
            />
          ))}
        </>
      )}
    </VideosDashboardContainer>
  );
}
