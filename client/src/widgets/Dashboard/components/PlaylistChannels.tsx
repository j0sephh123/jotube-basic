import { ViewType } from "@features/Dashboard";
import { Grid } from "@widgets/Grid";
import { PlaylistDetailsContainer } from "@widgets/PlaylistDetails";
import { ChannelDashboardCard } from "@widgets/Dashboard";

export const PlaylistChannels = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist, refetch) => (
        <Grid>
          {playlist?.channels.map((channel) => (
            <ChannelDashboardCard
              key={channel.id}
              id={channel.id}
              ytId={channel.ytId}
              title={channel.title}
              src={channel.src}
              videoCount={channel.videoCount}
              onChannelDelete={() => {}}
              onSyncUploads={refetch}
              featuredScreenshots={channel.featuredScreenshots}
              createdAt={""}
              defaults={channel.videoCount}
              saved={channel.saved}
              screenshotsCount={channel.screenshotCount}
              storyboard={0}
              thumbnails={channel.thumbnailCount}
              viewType={ViewType.THUMBNAILS}
              lastSyncedAt={channel.lastSyncedAt}
            />
          ))}
        </Grid>
      )}
    </PlaylistDetailsContainer>
  );
};
