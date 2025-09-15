import { SmoothProgressBar, useThumbnailsCount } from "@features/Thumbnails";
import { useEpisodesProcessingState } from "@shared/store";
import { type To } from "@shared/types";
import { CustomLink } from "@shared/ui";

export default function Header({
  channelLink,
  videoLabel,
}: {
  channelLink: To;
  videoLabel: string;
}) {
  const { items, currentIndex } = useEpisodesProcessingState();
  const thumbnailsCount = useThumbnailsCount();

  const title = items?.[0]?.tvIdentifier ?? "";

  const current = currentIndex ?? 0;
  const total = thumbnailsCount ?? 0;

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CustomLink to={channelLink}>
            <div className="ml-4 text-gray-300 text-sm">
              TV: {title ?? ""}
            </div>
          </CustomLink>
          <div className="text-gray-300 text-sm">{videoLabel}</div>
          <div className="text-gray-300 text-sm">
            {currentIndex + 1} / {thumbnailsCount}
          </div>
        </div>
      </div>
      <SmoothProgressBar current={current} total={total} />
    </div>
  );
}
