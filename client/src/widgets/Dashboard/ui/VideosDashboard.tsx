import { Card } from "@shared/ui";
import { VideosDashboardContainer, VideoChannelInfo } from "@widgets/Dashboard";
import { useCustomNavigate } from "@shared/hooks";
import { type DashboardVideoResponse } from "@shared/api";
import { setGalleryModal } from "@features/Gallery";
import { makeYtChannelId, makeYtVideoId } from "@shared/types";

export default function VideosDashboard() {
  const navigate = useCustomNavigate();

  const handleThumbnailClick = (video: DashboardVideoResponse) => {
    setGalleryModal({
      ytVideoId: video.ytId,
      ytChannelIds: [video.channelYtId],
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
              handleTitleClick={() => {
                navigate(`/channels/${makeYtChannelId(video.channelYtId)}/gallery/${makeYtVideoId(video.ytId)}`);
              }}
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
