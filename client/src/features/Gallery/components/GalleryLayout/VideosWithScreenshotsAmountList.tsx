import { useNavigate } from "react-router-dom";
import { routes } from "@shared/routes";
import { useTypedChannelYtId } from "@features/Dashboard";
import { useVideoScreenshotCounts } from "@features/Gallery";

type VideoScreenshotCount = {
  ytVideoId: string;
  screenshotCount: number;
};

export function VideosWithScreenshotsAmountList() {
  const ytChannelId = useTypedChannelYtId();
  const navigate = useNavigate();

  const handleVideoClick = (videoId: string) => {
    navigate(routes.galleryVideo(ytChannelId, videoId), {
      replace: true,
    });
  };

  const {
    data: videoScreenshotCounts,
    isLoading,
    error,
  } = useVideoScreenshotCounts(ytChannelId);

  if (isLoading) {
    return (
      <div className="w-64 bg-gray-900 border-r border-gray-700 h-screen overflow-y-auto">
        <div className="p-4">
          <div className="mb-4 text-sm text-gray-300">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-64 bg-gray-900 border-r border-gray-700 h-screen overflow-y-auto">
        <div className="p-4">
          <div className="mb-4 text-sm text-red-400">Error loading data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 h-screen overflow-y-auto">
      <div className="p-4">
        <div className="mb-4 text-sm text-gray-300">
          Total: {videoScreenshotCounts?.length || 0}
        </div>
        <div className="space-y-2">
          {videoScreenshotCounts?.map((videoCount: VideoScreenshotCount) => (
            <button
              key={videoCount.ytVideoId}
              onClick={() => handleVideoClick(videoCount.ytVideoId)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                location.pathname.endsWith(`/gallery/${videoCount.ytVideoId}`)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
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
  );
}
