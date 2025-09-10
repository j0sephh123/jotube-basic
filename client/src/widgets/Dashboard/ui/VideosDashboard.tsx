import { Card } from "@shared/ui";
import { VideosDashboardContainer, VideoChannelInfo } from "@widgets/Dashboard";
import { type DashboardVideoResponse } from "@shared/api";
import { setGalleryModal } from "@features/Gallery";
import { makeYtChannelId, makeYtVideoId } from "@shared/types";
import { Virtualizer } from "@widgets/Virtualizer";

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
        <Virtualizer
          flexibleHeight={false}
          items={videos}
          ItemComponent={({ item }) => (
            <Card
              key={item.id}
              featuredScreenshotsLength={item.screenshotCount}
              id={item.id}
              ytId={item.ytId}
              title={item.title}
              src={item.src}
              onThumbnailClick={() => handleThumbnailClick(item)}
              to={`/channels/${makeYtChannelId(
                item.channelYtId
              )}/gallery/${makeYtVideoId(item.ytId)}`}
              secondRow={
                <VideoChannelInfo
                  channelTitle={`${item.channelTitle} (${item.screenshotCount})`}
                  channelYtId={item.channelYtId}
                />
              }
            />
          )}
        />
      )}
    </VideosDashboardContainer>
  );
}
