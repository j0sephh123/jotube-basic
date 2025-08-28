import {
  useZoomScreenshot,
  useSetFeaturedScreenshot,
  useDeleteWithConfirm,
  type ChannelScreenshot,
} from "@features/Screenshot";
import {
  GalleryItem,
  useScreenshotsForGallery,
  GalleryVideoHeader,
} from "@features/Gallery";
import { StaticStates } from "@shared/ui";
import { useMemo } from "react";

type ScreenshotGroup = {
  screenshots: ChannelScreenshot[];
  startTime: number;
  endTime: number;
  timeSpan: number;
};

type Props = {
  ytVideoId: string;
  ytChannelId: string;
};

export function GalleryVideo({ ytVideoId, ytChannelId }: Props) {
  const { screenshots, videoScreenshots, isLoading, error } =
    useScreenshotsForGallery({
      ytVideoId,
      ytChannelIds: [ytChannelId],
    });

  const groupedScreenshotsByTime = useMemo(
    () => createTemporalGroups(videoScreenshots),
    [videoScreenshots]
  );

  const handleZoom = useZoomScreenshot();
  const handleSetFeatured = useSetFeaturedScreenshot();
  const handleDelete = useDeleteWithConfirm();

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={screenshots?.length === 0}
    >
      <div className="p-6 pb-20">
        <div className="space-y-6">
          {groupedScreenshotsByTime.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-3">
              <GalleryVideoHeader group={group} />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.screenshots.map((screenshot) => (
                  <GalleryItem
                    key={screenshot.id}
                    screenshot={screenshot}
                    onFavorite={() => handleSetFeatured(screenshot)}
                    onDelete={() => handleDelete(screenshot)}
                    onImageClick={() => handleZoom(screenshot)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticStates>
  );
}

function createTemporalGroups(
  screenshots: ChannelScreenshot[]
): ScreenshotGroup[] {
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
    const timeDifference = currentScreenshot.second - previousScreenshot.second;

    if (timeDifference <= 3) {
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
}
