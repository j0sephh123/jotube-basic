import { useMemo } from "react";
import { type VideoGroup } from "./types";
import { useFetchChannelScreenshots } from "@features/Screenshot";
import { useNavigate } from "react-router-dom";
import { routes } from "@shared/routes";
import { useTypedChannelYtId } from "@features/Dashboard";

export function SidePanel() {
  const ytChannelId = useTypedChannelYtId();
  const navigate = useNavigate();

  const handleVideoClick = (videoId: string) => {
    navigate(routes.galleryVideo(ytChannelId, videoId), {
      replace: true,
    });
  };

  const { data: screenshots } = useFetchChannelScreenshots();

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

  return (
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
  );
}
