import { VideosDashboardContainer } from "@widgets/Dashboard";
import { Virtualizer } from "@widgets/Virtualizer";
import { VideosDashboardCard } from "./VideosDashboardCard";
import { useParams } from "react-router-dom";

export default function VideosDashboard() {
  const { videosDashboardViewType } = useParams<{
    videosDashboardViewType: string;
  }>();

  return (
    <VideosDashboardContainer>
      {(videos) => (
        <Virtualizer
          flexibleHeight
          items={videos}
          ItemComponent={({ item }) => (
            <VideosDashboardCard
              key={item.id}
              video={item}
              videosDashboardViewType={videosDashboardViewType as string}
            />
          )}
        />
      )}
    </VideosDashboardContainer>
  );
}
