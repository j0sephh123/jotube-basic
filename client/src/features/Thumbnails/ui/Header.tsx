import {
  useThumbnailsState,
  SmoothProgressBar,
  useThumbnailsCount,
} from "@features/Thumbnails";

export default function Header() {
  const { thumbnailsProcessingData, currentIndex } = useThumbnailsState();
  const thumbnailsCount = useThumbnailsCount();

  const current = currentIndex || 0;
  const total = thumbnailsCount || 0;

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Processing Thumbnails</h2>
          <div className="ml-4 text-gray-300 text-sm">
            Channel: {thumbnailsProcessingData[0]?.ytChannelId ?? ""}
          </div>
          <div className="text-gray-300 text-sm">
            Video: {thumbnailsProcessingData[0]?.ytVideoId ?? ""}
          </div>
          <div className="text-gray-300 text-sm">
            {currentIndex + 1} / {thumbnailsCount}
          </div>
        </div>
      </div>
      <SmoothProgressBar current={current} total={total} />
    </div>
  );
}
