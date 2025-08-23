import type { PlaylistDetailsResponse } from "@shared/api";

type RightSectionProps = {
  playlist: PlaylistDetailsResponse;
};

export default function RightSection({ playlist }: RightSectionProps) {
  const totalCounts = playlist.channels.reduce(
    (acc, channel) => {
      return {
        videoCount: acc.videoCount + channel.videoCount,
        savedCount: acc.savedCount + channel.savedCount,
        screenshotCount: acc.screenshotCount + channel.screenshotCount,
        thumbnailCount: acc.thumbnailCount + channel.thumbnailCount,
      };
    },
    {
      videoCount: 0,
      savedCount: 0,
      screenshotCount: 0,
      thumbnailCount: 0,
    }
  );

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-bold mb-4">Playlist Summary</h2>

        <div className="space-y-4">
          <div className="stat bg-primary/10 rounded-lg p-4">
            <div className="stat-title text-primary">Total Videos</div>
            <div className="stat-value text-primary text-2xl">
              {totalCounts.videoCount.toLocaleString()}
            </div>
          </div>

          <div className="stat bg-success/10 rounded-lg p-4">
            <div className="stat-title text-success">Saved Videos</div>
            <div className="stat-value text-success text-2xl">
              {totalCounts.savedCount.toLocaleString()}
            </div>
          </div>

          <div className="stat bg-warning/10 rounded-lg p-4">
            <div className="stat-title text-warning">Screenshots</div>
            <div className="stat-value text-warning text-2xl">
              {totalCounts.screenshotCount.toLocaleString()}
            </div>
          </div>

          <div className="stat bg-info/10 rounded-lg p-4">
            <div className="stat-title text-info">Thumbnails</div>
            <div className="stat-value text-info text-2xl">
              {totalCounts.thumbnailCount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="text-center">
          <div className="text-sm text-base-content/70">Total Channels</div>
          <div className="text-2xl font-bold text-primary">
            {playlist.channels.length}
          </div>
        </div>
      </div>
    </div>
  );
}
