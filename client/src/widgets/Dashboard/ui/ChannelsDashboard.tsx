import { type ViewType } from "@features/Dashboard";
import {
  ChannelDashboardCard,
  ChannelsDashboardContainer,
} from "@widgets/Dashboard";
import { Virtualizer } from "@widgets/Virtualizer";

export default function ChannelsDashboard({
  viewType,
}: {
  viewType: ViewType;
}) {
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
              viewType={viewType}
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
