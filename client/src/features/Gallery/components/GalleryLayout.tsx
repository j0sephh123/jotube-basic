import { useTypedChannelYtId } from "@shared/hooks/useDashboardParams";
import { useFetchChannelScreenshots } from "@features/Screenshot/hooks/useFetchChannelScreenshots";
import { useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { routes } from "@shared/utils/routes";

type VideoGroup = {
  ytVideoId: string;
  screenshots: { id: number }[];
};

export default function GalleryLayout() {
  const ytChannelId = useTypedChannelYtId();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: screenshots } = useFetchChannelScreenshots(ytChannelId);

  const groupedScreenshots = useMemo(() => {
    if (!screenshots) return [];
    const groups = new Map<string, { id: number }[]>();
    screenshots.forEach((screenshot) => {
      const videoId = screenshot.ytVideoId;
      if (!groups.has(videoId)) {
        groups.set(videoId, []);
      }
      groups.get(videoId)!.push({ id: screenshot.id });
    });
    const uniqueVideoIds = Array.from(groups.keys());
    const videoGroups: VideoGroup[] = [];
    uniqueVideoIds.forEach((videoId) => {
      const groupScreenshots = groups.get(videoId)!;
      videoGroups.push({
        ytVideoId: videoId,
        screenshots: groupScreenshots.map((s) => ({ id: s.id })),
      });
    });
    return videoGroups;
  }, [screenshots]);

  const sortedGroupedScreenshots = useMemo(() => {
    return [...groupedScreenshots].sort(
      (a, b) => b.screenshots.length - a.screenshots.length
    );
  }, [groupedScreenshots]);

  const handleVideoClick = (videoId: string) => {
    navigate(routes.galleryVideo(ytChannelId, videoId));
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-900 border-r border-gray-700 h-screen overflow-y-auto">
        <div className="p-4">
          <div className="mb-4 text-sm text-gray-300">
            Total: {sortedGroupedScreenshots.length}
          </div>
          <div className="space-y-2">
            {sortedGroupedScreenshots.map((videoGroup) => (
              <button
                key={videoGroup.ytVideoId}
                onClick={() => handleVideoClick(videoGroup.ytVideoId)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  location.pathname.endsWith(`/gallery/${videoGroup.ytVideoId}`)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-gray-400">
                    {videoGroup.screenshots.length} screenshots
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex-col h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
