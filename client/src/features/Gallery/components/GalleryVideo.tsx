import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

type ScreenshotGroup = {
  screenshots: ChannelScreenshot[];
  startTime: number;
  endTime: number;
  timeSpan: number;
};

import { useDialog } from "@shared/hooks";
import type { ChannelScreenshot } from "@features/Screenshot";
import {
  useFetchChannelScreenshots,
  useDeleteChannelScreenshot,
  useUpdateChannelScreenshot,
  useZoom,
} from "@features/Screenshot";
import { GalleryItem } from "@features/Gallery";
import { StaticStates } from "@shared/ui";

const TEMPORAL_THRESHOLD = 3;

export function GalleryVideo() {
  const { ytVideoId } = useParams<{ ytVideoId: string }>();
  const [mode, setMode] = useState<"view" | "clip">("clip");

  const {
    data: screenshots,
    isLoading,
    error,
  } = useFetchChannelScreenshots();

  const updateScreenshot = useUpdateChannelScreenshot();
  const deleteScreenshot = useDeleteChannelScreenshot();
  const dialogHook = useDialog();
  const { setZoom, closeZoom } = useZoom();

  const videoScreenshots = useMemo(() => {
    if (!screenshots || !ytVideoId) return [];
    return screenshots.filter(
      (screenshot) => screenshot.ytVideoId === ytVideoId
    );
  }, [screenshots, ytVideoId]);

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

  const temporalGroups = createTemporalGroups(videoScreenshots);

  const handleImageClick = (clickedIndex: number) => {
    if (!videoScreenshots) return;

    const screenshot = videoScreenshots[clickedIndex];
    if (screenshot) {
      setZoom(true, screenshot.src, closeZoom);
    }
  };

  const handleFavorite = (index: number) => {
    if (!videoScreenshots) return;

    const screenshot = videoScreenshots[index] as ChannelScreenshot;
    if (screenshot) {
      updateScreenshot.mutate({ id: screenshot.id, isFav: true });
    }
  };

  const handleDelete = (index: number) => {
    if (!videoScreenshots) return;

    const screenshot = videoScreenshots[index] as ChannelScreenshot;
    if (screenshot) {
      dialogHook.confirm({
        title: "Delete Screenshot",
        message:
          "Are you sure you want to delete this screenshot? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
        variant: "error",
        onYes: () => {
          deleteScreenshot.mutate(screenshot.id);
        },
      });
    }
  };

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={videoScreenshots?.length === 0}
    >
      <div className="p-6 pb-20">
        <div className="flex justify-between items-center mb-6">
          <div className="form-control">
            <label className="label cursor-pointer gap-4">
              <span className="label-text">View Mode</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={mode === "clip"}
                onChange={(e) => setMode(e.target.checked ? "clip" : "view")}
              />
              <span className="label-text">Clip Mode</span>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          {temporalGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="font-mono">
                  {group.screenshots[0]!.second}s -{" "}
                  {group.screenshots[group.screenshots.length - 1]!.second}s
                </span>
                <span>({group.screenshots.length} screenshots)</span>
                {group.timeSpan > 0 && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {group.timeSpan}s span
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {group.screenshots.map((screenshot) => {
                  const globalIndex = videoScreenshots.findIndex(
                    (s) => s.id === screenshot.id
                  );

                  return (
                    <GalleryItem
                      key={screenshot.id}
                      screenshot={screenshot}
                      isFav={screenshot.isFav ?? undefined}
                      index={globalIndex}
                      mode={mode}
                      isDisabled={false}
                      isInRanges={false}
                      onFavorite={handleFavorite}
                      onDelete={handleDelete}
                      onImageClick={handleImageClick}
                      onAddToRanges={() => {}}
                      onRemoveSecond={() => {}}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticStates>
  );
}
