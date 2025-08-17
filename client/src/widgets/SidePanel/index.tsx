import { useSidePanel } from "@/store/store";
import {
  useScreenshotsByVideo,
  VideoScreenshot,
} from "@/features/Screenshot/hooks/useScreenshotsByVideo";
import { useVideoModal } from "@/shared/hooks/useVideoModal";
import VideoModal from "@/shared/components/VideoModal";
import { formatSecondsToTime } from "@/shared/utils/format";
import { Play, Clock } from "lucide-react";
import { useState } from "react";
import SidePanelHeader from "@/shared/components/SidePanel/SidePanelHeader";
import SidePanelWrapper from "@/shared/components/SidePanel/SidePanelWrapper";

type ScreenshotGroup = {
  screenshots: VideoScreenshot[];
  startTime: number;
  endTime: number;
  timeSpan: number;
};

const TEMPORAL_THRESHOLD = 3;

export default function SidePanel() {
  const isOpen = useSidePanel((s) => s.isOpen);
  const videoId = useSidePanel((s) => s.videoId);
  const { isVideoModalVisible, openVideoModal, closeVideoModal, getEmbedUrl } =
    useVideoModal();
  const { data: screenshots } = useScreenshotsByVideo(videoId || "");
  const [selectedScreenshotTime, setSelectedScreenshotTime] = useState(0);

  const screenshotsArray = screenshots || [];

  const createTemporalGroups = (
    screenshots: VideoScreenshot[]
  ): ScreenshotGroup[] => {
    if (screenshots.length === 0) return [];

    const sortedScreenshots = [...screenshots].sort(
      (a, b) => a.second - b.second
    );
    const groups: ScreenshotGroup[] = [];
    let currentGroup: VideoScreenshot[] = [sortedScreenshots[0]!];
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

  const temporalGroups = createTemporalGroups(screenshotsArray);

  const handleScreenshotClick = (screenshot: VideoScreenshot) => {
    setSelectedScreenshotTime(screenshot.second);
    openVideoModal();
  };

  if (!isOpen || !videoId) return null;

  return (
    <>
      <SidePanelWrapper>
        <SidePanelHeader amount={screenshotsArray.length} />
        <div className="p-4">
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
        </div>
      </SidePanelWrapper>

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
