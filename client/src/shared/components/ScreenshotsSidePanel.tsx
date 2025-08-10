import { useStore } from "@/store/store";
import { useScreenshotsByVideo } from "@/features/Screenshot/hooks/useScreenshotsByVideo";
import { useVideoModal } from "@/shared/hooks/useVideoModal";
import VideoModal from "@/shared/components/VideoModal";
import { formatSecondsToTime } from "@/shared/utils/format";
import { X, Play, Clock } from "lucide-react";
import { useState } from "react";

type ScreenshotGroup = {
  screenshots: any[];
  startTime: number;
  endTime: number;
  timeSpan: number;
};

const TEMPORAL_THRESHOLD = 3;

export default function ScreenshotsSidePanel() {
  const { isOpen, videoId, channelId, closeSidePanel } = useStore();
  const { isVideoModalVisible, openVideoModal, closeVideoModal, getEmbedUrl } =
    useVideoModal();
  const { data: screenshots } = useScreenshotsByVideo(videoId || "");
  const [selectedScreenshotTime, setSelectedScreenshotTime] = useState(0);

  const createTemporalGroups = (screenshots: any[]): ScreenshotGroup[] => {
    if (screenshots.length === 0) return [];

    const sortedScreenshots = [...screenshots].sort(
      (a, b) => a.second - b.second
    );
    const groups: ScreenshotGroup[] = [];
    let currentGroup: any[] = [sortedScreenshots[0]!];
    let currentStartTime = sortedScreenshots[0]!.second;
    let currentEndTime = sortedScreenshots[0]!.second;

    for (let i = 1; i < sortedScreenshots.length; i++) {
      const currentScreenshot = sortedScreenshots[i]!;
      const previousScreenshot = sortedScreenshots[i - 1]!;
      const timeDifference =
        currentScreenshot.second - previousScreenshot.second;

      if (timeDifference <= TEMPORAL_THRESHOLD) {
        currentGroup.push(currentScreenshot);
        currentEndTime = currentScreenshot.second;
      } else {
        groups.push({
          screenshots: currentGroup,
          startTime: currentStartTime,
          endTime: currentEndTime,
          timeSpan: currentEndTime - currentStartTime,
        });

        currentGroup = [currentScreenshot];
        currentStartTime = currentScreenshot.second;
        currentEndTime = currentScreenshot.second;
      }
    }

    if (currentGroup.length > 0) {
      groups.push({
        screenshots: currentGroup,
        startTime: currentStartTime,
        endTime: currentEndTime,
        timeSpan: currentEndTime - currentStartTime,
      });
    }

    return groups;
  };

  const temporalGroups = createTemporalGroups(screenshots || []);

  const handleScreenshotClick = (screenshot: any) => {
    setSelectedScreenshotTime(screenshot.second);
    openVideoModal();
  };

  if (!isOpen || !videoId) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeSidePanel}
      />
      <div className="fixed right-0 top-0 h-full w-96 bg-base-100 border-l border-base-300 shadow-xl z-50 overflow-y-auto">
        <div className="p-4 border-b border-base-300 bg-base-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-base-content" />
              <h2 className="text-lg font-semibold text-base-content">
                Screenshots
              </h2>
            </div>
            <button
              onClick={closeSidePanel}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {screenshots && screenshots.length > 0 && (
            <p className="text-sm text-base-content/70 mt-1">
              {screenshots.length} screenshot
              {screenshots.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        <div className="p-4">
          {screenshots && screenshots.length > 0 ? (
            <div className="space-y-6">
              {temporalGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">
                        {formatSecondsToTime(group.startTime)} -{" "}
                        {formatSecondsToTime(group.endTime)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-xs bg-base-300 text-base-content px-2 py-1 rounded">
                        {group.screenshots.length} screenshot
                        {group.screenshots.length !== 1 ? "s" : ""}
                      </span>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {group.timeSpan}s span
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {group.screenshots.map((screenshot) => (
                      <div
                        key={screenshot.id}
                        className="relative group cursor-pointer"
                        onClick={() => handleScreenshotClick(screenshot)}
                      >
                        <div className="aspect-video bg-base-300 rounded-lg overflow-hidden border border-base-300 hover:border-primary/50 transition-colors">
                          <img
                            src={screenshot.src}
                            alt={`Screenshot at ${screenshot.second}s`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />

                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-6 h-6 text-primary-content" />
                            </div>
                          </div>
                        </div>

                        <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {formatSecondsToTime(screenshot.second)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="w-16 h-16 text-base-content/30 mb-4" />
              <p className="text-base-content/70 text-lg font-medium mb-2">
                No screenshots found
              </p>
              <p className="text-base-content/50 text-sm">
                This video doesn't have any screenshots yet.
              </p>
            </div>
          )}
        </div>
      </div>

      <VideoModal
        isVisible={isVideoModalVisible}
        onClose={closeVideoModal}
        videoId={videoId}
        embedUrl={getEmbedUrl(videoId, selectedScreenshotTime)}
        startTime={selectedScreenshotTime}
      />
    </>
  );
}
