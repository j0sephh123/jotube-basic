import { Card } from "@shared/ui";
import { VideosDashboardContainer, VideoChannelInfo } from "@widgets/Dashboard";
import { useNavigate } from "react-router-dom";
import { routes } from "@shared/routes";
import { type DashboardVideoResponse } from "@shared/api";
import { setGalleryModal } from "@features/Gallery";

export default function VideosDashboard() {
  const navigate = useNavigate();

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
                navigate(routes.galleryVideo(video.channelYtId, video.ytId));
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
