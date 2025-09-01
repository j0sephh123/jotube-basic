/* eslint-disable boundaries/element-types */
import { setGalleryModal } from "@features/Gallery";
import { useVideoScreenshotCounts } from "@features/Gallery";
import { StaticStates } from "@shared/ui";
import { useTypedParams } from "@shared/hooks";

type VideoScreenshotCount = {
  ytVideoId: string;
  screenshotCount: number;
};

export function GalleryVideosList() {
  const ytChannelId = useTypedParams("ytChannelId");

  const handleVideoClick = (videoId: string) => {
    setGalleryModal({
      ytVideoId: videoId,
      ytChannelIds: [ytChannelId],
    });
  };

  const {
    data: videoScreenshotCounts,
    isLoading,
    error,
  } = useVideoScreenshotCounts(ytChannelId);

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={videoScreenshotCounts?.length === 0}
    >
      <div className="w-full bg-gray-900 h-screen overflow-y-auto">
        <div className="p-4">
          <div className="mb-4 text-sm text-gray-300">
            Total: {videoScreenshotCounts?.length || 0}
          </div>
          <div className="space-y-2">
            {videoScreenshotCounts?.map((videoCount: VideoScreenshotCount) => (
              <button
                key={videoCount.ytVideoId}
                onClick={() => handleVideoClick(videoCount.ytVideoId)}
                className={`bg-gray-800 hover:bg-gray-700 w-full text-left p-3 rounded-lg transition-colors`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-gray-400">
                    {videoCount.screenshotCount} screenshots
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
