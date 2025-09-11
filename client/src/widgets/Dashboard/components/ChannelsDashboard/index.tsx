import {
  ChannelDashboardCard,
  ChannelsDashboardContainer,
} from "@widgets/Dashboard";
import { Virtualizer } from "@widgets/Virtualizer";
import { useParams } from "react-router-dom";
import { type ViewType } from "@shared/api";

export default function ChannelsDashboard() {
  const { viewType } = useParams<{ viewType: string }>();

  return (
    <ChannelsDashboardContainer>
      {(channels, refetch) => (
        <Virtualizer
          items={channels}
          ItemComponent={({ item }) => (
            <ChannelDashboardCard
              key={item.id}
              id={item.id}
              ytId={item.ytId}
              title={item.title}
              src={item.src}
              lastSyncedAt={item.lastSyncedAt}
              screenshotsCount={item.screenshotsCount}
              thumbnails={item.thumbnails}
              saved={item.saved}
              defaults={item.defaults}
              storyboard={item.storyboard}
              createdAt={item.createdAt}
              videoCount={item.videoCount}
              playlist={item.playlist}
              viewType={viewType as unknown as ViewType}
              onChannelDelete={refetch}
              featuredScreenshots={item.featuredScreenshots}
            />
          )}
          flexibleHeight={true}
        />
      )}
    </ChannelsDashboardContainer>
  );
}
