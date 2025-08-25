import { Heart, Trash2, Eye, Copy, Star } from "lucide-react";
import clsx from "clsx";
import { useVideoModalStore } from "@shared/hooks";
import { formatSecondsToTime } from "@shared/utils";
import { type ChannelScreenshot } from "@features/Screenshot";

type Props = {
  screenshot: ChannelScreenshot;
  index: number;
  mode: "view" | "clip";
  color?: string;
  isDisabled?: boolean;
  isInRanges?: boolean;
  isFav?: boolean;
  onFavorite: (index: number) => void;
  onDelete: (index: number) => void;
  onImageClick: (index: number) => void;
  onAddToRanges?: (ytVideoId: string, second: number) => void;
  onRemoveSecond?: (second: number) => void;
};

export default function GalleryItem({
  screenshot,
  index,
  mode,
  isDisabled,
  isInRanges,
  isFav,
  onFavorite,
  onDelete,
  onImageClick,
  onAddToRanges,
  onRemoveSecond,
}: Props) {
  const { openVideoModal } = useVideoModalStore();

  const handleGalleryItemClick = () => {
    if (isDisabled) return;

    if (mode === "clip") {
      openVideoModal(screenshot.ytVideoId, screenshot.second);
    } else {
      onImageClick(index);
    }
  };

  return (
    <>
      <div
        className={clsx(
          "flex-1 relative group",
          isDisabled && "pointer-events-none"
        )}
      >
        <div
          className={clsx(
            "aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer",
            isDisabled && "blur-sm opacity-50"
          )}
          onClick={handleGalleryItemClick}
        >
          <img
            src={screenshot.src}
            alt={`Screenshot ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {mode === "clip" && !isDisabled && (
            <div className="absolute top-2 left-2 z-10 flex gap-1">
              {isFav && (
                <div className="bg-yellow-500 text-white p-1 rounded flex items-center justify-center">
                  <Star className="w-4 h-4 fill-current" />
                </div>
              )}
              <button
                className={clsx(
                  "px-2 py-1 rounded text-xs font-mono cursor-pointer",
                  isInRanges
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-black/70 hover:bg-black/90 text-white"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isInRanges) {
                    onRemoveSecond?.(screenshot.second);
                  } else {
                    onAddToRanges?.(screenshot.ytVideoId, screenshot.second);
                  }
                }}
                title={isInRanges ? "Remove from ranges" : "Add to ranges"}
              >
                {formatSecondsToTime(screenshot.second)}
              </button>
            </div>
          )}

          {isFav && mode === "view" && (
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-yellow-500 text-white p-1 rounded flex items-center justify-center">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
          )}

          {mode === "clip" && screenshot.ytVideoId && !isDisabled && (
            <div className="absolute top-2 right-2 z-10 flex gap-1">
              <button
                className="bg-black/70 hover:bg-black/90 text-white p-1 rounded transition-colors"
                onClick={async (e) => {
                  e.stopPropagation();
                  await navigator.clipboard.writeText(screenshot.ytVideoId);
                }}
                title={`Copy YouTube Video ID: ${screenshot.ytVideoId}`}
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          )}

          <div
            className={clsx(
              "absolute inset-0 transition-all duration-200",
              mode === "view"
                ? "opacity-0 group-hover:opacity-100"
                : "opacity-0"
            )}
          >
            <div
              className={clsx(
                "absolute top-0 left-0 w-1/2 h-1/2 bg-red-500/80 hover:bg-red-500 flex items-center justify-center",
                mode === "view" ? "cursor-pointer" : "cursor-default"
              )}
              onClick={
                mode === "view"
                  ? (e) => {
                      e.stopPropagation();
                      onFavorite(index);
                    }
                  : undefined
              }
              title={mode === "view" ? "Favorite" : undefined}
            >
              <Heart className="w-6 h-6 text-white" />
            </div>

            <div
              className={clsx(
                "absolute bottom-0 left-0 w-1/2 h-1/2 bg-red-600/80 hover:bg-red-600 flex items-center justify-center",
                mode === "view" ? "cursor-pointer" : "cursor-default"
              )}
              onClick={
                mode === "view"
                  ? (e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }
                  : undefined
              }
              title={mode === "view" ? "Delete" : undefined}
            >
              <Trash2 className="w-6 h-6 text-white" />
            </div>

            <div
              className={clsx(
                "absolute top-0 right-0 w-1/2 h-full bg-blue-500/80 hover:bg-blue-500 flex items-center justify-center",
                mode === "view" ? "cursor-pointer" : "cursor-default"
              )}
              onClick={
                mode === "view"
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onImageClick(index);
                    }
                  : undefined
              }
              title={mode === "view" ? "View" : undefined}
            >
              <Eye className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
