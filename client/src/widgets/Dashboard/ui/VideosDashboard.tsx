import { Card } from "@shared/ui";
import {
  VideosDashboardContainer,
  VideoChannelInfo,
  ScreenshotCountButton,
} from "@widgets/Dashboard";
import { useNavigate } from "react-router-dom";
import { routes } from "@shared/routes";

export default function VideosDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <VideosDashboardContainer>
        {(videos) =>
          videos.map((video) => (
            <Card
              key={video.id}
              id={video.id}
              ytId={video.ytId}
              title={video.title}
              src={video.src}
              handleTitleClick={() => {
                navigate(routes.galleryVideo(video.channelYtId, video.ytId));
              }}
              secondRow={
                <VideoChannelInfo
                  channelTitle={video.channelTitle}
                  channelYtId={video.channelYtId}
                />
              }
              actionButtonSlot={
                <ScreenshotCountButton
                  screenshotCount={video.screenshotCount}
                  videoYtId={video.ytId}
                  channelYtId={video.channelYtId}
                />
              }
            />
          ))
        }
      </VideosDashboardContainer>
    </>
  );
}
