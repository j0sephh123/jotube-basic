/* eslint-disable boundaries/element-types */
import { setGalleryModal } from "@features/Gallery";
import { useVideoScreenshotCounts } from "@features/Gallery";
import { StaticStates } from "@shared/ui";
import { timeAgo } from "@shared/utils";
import { useState, useMemo } from "react";
import { YtIdToId } from "@shared/hoc";

type VideoScreenshotCount = {
  ytVideoId: string;
  screenshotCount: number;
  dateAdded: Date;
};

type SortOption = "count" | "date";

function GalleryVideosListInner({ channelId }: { channelId: number }) {
  const [sortBy, setSortBy] = useState<SortOption>("count");

  const handleVideoClick = (videoId: string) => {
    setGalleryModal({
      ytVideoId: videoId,
      channelIds: [channelId],
    });
  };

  const {
    data: videoScreenshotCounts,
    isLoading,
    error,
  } = useVideoScreenshotCounts(channelId);

  const sortedVideoCounts = useMemo(() => {
    if (!videoScreenshotCounts) return [];

    return [...videoScreenshotCounts].sort((a, b) => {
      if (sortBy === "count") {
        return b.screenshotCount - a.screenshotCount;
      } else {
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      }
    });
  }, [videoScreenshotCounts, sortBy]);

  console.log(videoScreenshotCounts);

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={videoScreenshotCounts?.length === 0}
    >
      <div className="w-full bg-gray-900 h-screen overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-xs bg-gray-800 text-gray-300 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-gray-500"
                >
                  <option value="count">Screenshot Count</option>
                  <option value="date">Date Added</option>
                </select>
              </div>
              <div className="text-sm text-gray-300">
                Total: {videoScreenshotCounts?.length || 0}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {sortedVideoCounts?.map((videoCount: VideoScreenshotCount) => (
              <button
                key={videoCount.ytVideoId}
                onClick={() => handleVideoClick(videoCount.ytVideoId)}
                className={`bg-gray-800 hover:bg-gray-700 text-left p-3 rounded-lg transition-colors`}
              >
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-semibold text-gray-300">
                    {videoCount.screenshotCount}
                  </div>
                  <div className="text-xs text-gray-500">
                    {timeAgo(videoCount.dateAdded.toString())}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </StaticStates>
  );
}

const GalleryVideosList = YtIdToId(GalleryVideosListInner);
export { GalleryVideosList };
