import { useRecentlyViewedChannels } from "@features/Channel";
import { CustomLink } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import { timeAgo } from "@shared/utils";

export const RecentlyViewedPage = () => {
  const { get, remove } = useRecentlyViewedChannels();
  const recentlyViewed = get();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-base-content">
        Recently Viewed Channels
      </h1>
      {recentlyViewed.length === 0 ? (
        <p className="text-base-content/60">No recently viewed channels</p>
      ) : (
        <div className="space-y-3">
          {recentlyViewed.map((channel) => (
            <div
              key={channel.id}
              className="p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
            >
              <div className="flex justify-between items-center">
                <CustomLink
                  to={`/channels/${makeYtChannelId(channel.ytId)}`}
                  className="text-base-content hover:text-base-content/80 font-medium text-lg"
                >
                  {channel.title}
                </CustomLink>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-base-content/60">
                    {timeAgo(channel.when.toISOString())}
                  </span>
                  <button
                    onClick={() => remove(channel.id)}
                    className="btn btn-ghost text-error hover:text-error-focus text-xl font-bold"
                    title="Remove from recently viewed"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
