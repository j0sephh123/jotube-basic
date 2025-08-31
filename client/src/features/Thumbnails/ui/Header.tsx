import { SmoothProgressBar, useThumbnailsCount } from "@features/Thumbnails";
import { useThumbnailsProcessingState } from "@shared/store";
import { CustomLink } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";

export default function Header() {
  const { items, currentIndex } = useThumbnailsProcessingState();
  const thumbnailsCount = useThumbnailsCount();

  const ytChannelId = items?.[0]?.ytChannelId ?? "";
  const ytVideoId = items?.[0]?.ytVideoId ?? "";
  const channelTitle = items?.[0]?.channelTitle ?? "";

  const current = currentIndex ?? 0;
  const total = thumbnailsCount ?? 0;

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CustomLink to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}>
            <div className="ml-4 text-gray-300 text-sm">
              Channel: {channelTitle ?? ""}
            </div>
          </CustomLink>
          <div className="text-gray-300 text-sm">Video: {ytVideoId ?? ""}</div>
          <div className="text-gray-300 text-sm">
            {currentIndex + 1} / {thumbnailsCount}
          </div>
        </div>
      </div>
      <SmoothProgressBar current={current} total={total} />
    </div>
  );
}
