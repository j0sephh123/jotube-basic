import Card from "@/shared/ui/card";
import VideosDashboardContainer from "@/widgets/Dashboard/ui/VideosDashboardContainer";
import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/utils/routes";
import VideoChannelInfo from "@/features/Dashboard/components/VideoChannelInfo";
import ScreenshotCountButton from "@/features/Dashboard/components/ScreenshotCountButton";

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
