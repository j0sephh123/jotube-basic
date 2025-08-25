import { useFetchChannelScreenshots } from "@features/Screenshot";
import { GalleryItem } from "@features/Gallery";
import { useMemo, useState } from "react";
import { useDialog } from "@shared/hooks";
import {
  useDeleteChannelScreenshot,
  useUpdateChannelScreenshot,
} from "@features/Screenshot";
import { useZoom } from "@features/Screenshot";
import { StaticStates } from "@shared/ui";

export default function Gallery() {
  const [mode, setMode] = useState<"view" | "clip">("clip");

  const { data: screenshots, isLoading, error } = useFetchChannelScreenshots();

  const updateScreenshot = useUpdateChannelScreenshot();
  const deleteScreenshot = useDeleteChannelScreenshot();
  const dialogHook = useDialog();
  const { setZoom, closeZoom } = useZoom();

  const groupedScreenshots = useMemo(() => {
    if (!screenshots) return [];
    const groups = new Map<string, typeof screenshots>();
    screenshots.forEach((screenshot) => {
      const videoId = screenshot.ytVideoId;
      if (!groups.has(videoId)) {
        groups.set(videoId, []);
      }
      groups.get(videoId)!.push(screenshot);
    });
    return Array.from(groups.entries()).map(([videoId, videoScreenshots]) => ({
      videoId,
      screenshots: videoScreenshots,
    }));
  }, [screenshots]);

  const handleFavorite = (index: number) => {
    const screenshot = screenshots?.[index];
    if (screenshot) {
      updateScreenshot.mutate({
        id: screenshot.id,
        isFav: !screenshot.isFav,
      });
    }
  };

  const handleDelete = (index: number) => {
    const screenshot = screenshots?.[index];
    if (screenshot) {
      dialogHook.confirm({
        title: "Delete Screenshot",
        message: "Are you sure you want to delete this screenshot?",
        confirmText: "Delete",
        cancelText: "Cancel",
        variant: "warning",
        onYes: () => {
          deleteScreenshot.mutate(screenshot.id);
        },
      });
    }
  };

  const handleImageClick = (index: number) => {
    const screenshot = screenshots?.[index];
    if (screenshot) {
      setZoom(true, screenshot.src, closeZoom);
    }
  };

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={screenshots?.length === 0}
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

        <div className="space-y-8">
          {groupedScreenshots.map(
            ({ videoId, screenshots: videoScreenshots }) => (
              <div key={videoId} className="space-y-4">
                <h2 className="text-lg font-semibold">Video: {videoId}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {videoScreenshots.map((screenshot) => {
                    const globalIndex =
                      screenshots?.findIndex((s) => s.id === screenshot.id) ??
                      0;

                    return (
                      <GalleryItem
                        key={screenshot.id}
                        screenshot={screenshot}
                        isFav={screenshot.isFav ?? undefined}
                        index={globalIndex ?? 0}
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
            )
          )}
        </div>
      </div>
    </StaticStates>
  );
}
