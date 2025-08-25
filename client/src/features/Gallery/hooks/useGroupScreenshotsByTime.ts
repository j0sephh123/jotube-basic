import { useTypedVideoYtId } from "@features/Dashboard";
import {
  useFetchChannelScreenshots,
  type ChannelScreenshot,
} from "@features/Screenshot";
import { useMemo } from "react";

const TEMPORAL_THRESHOLD = 3;

export type ScreenshotGroup = {
  screenshots: ChannelScreenshot[];
  startTime: number;
  endTime: number;
  timeSpan: number;
};

export function useGroupScreenshotsByTime() {
  const ytVideoId = useTypedVideoYtId();

  const createTemporalGroups = (
    screenshots: ChannelScreenshot[]
  ): ScreenshotGroup[] => {
    if (screenshots.length === 0) return [];

    const sortedScreenshots = [...screenshots].sort(
      (a, b) => a.second - b.second
    );
    const groups: ScreenshotGroup[] = [];
    let currentGroup: ChannelScreenshot[] = [sortedScreenshots[0]!];
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

  const { data: screenshots } = useFetchChannelScreenshots();

  const videoScreenshots = useMemo(() => {
    if (!screenshots || !ytVideoId) return [];
    return screenshots.filter(
      (screenshot) => screenshot.ytVideoId === ytVideoId
    );
  }, [screenshots, ytVideoId]);

  const groupedScreenshotsByTime = createTemporalGroups(videoScreenshots);

  return groupedScreenshotsByTime;
}
