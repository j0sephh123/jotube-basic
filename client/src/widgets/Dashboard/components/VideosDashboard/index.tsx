import { VideosDashboardContainer } from "@widgets/Dashboard";
import { Virtualizer } from "@widgets/Virtualizer";
import { VideosDashboardCard } from "./VideosDashboardCard";
import { useParams } from "react-router-dom";

export default function VideosDashboard() {
  const { viewType } = useParams<{
    viewType: string;
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
              viewType={viewType as string}
            />
          )}
        />
      )}
    </VideosDashboardContainer>
  );
}
