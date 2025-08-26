import {
  useZoomScreenshot,
  useSetFeaturedScreenshot,
  useDeleteWithConfirm,
} from "@features/Screenshot";
import {
  GalleryItem,
  useGroupScreenshotsByTime,
  useGalleryVideoScreenshots,
  GalleryVideoHeader,
} from "@features/Gallery";
import { StaticStates } from "@shared/ui";

type Props = {
  ytVideoId: string;
  ytChannelId: string;
};

export function GalleryVideo({ ytVideoId, ytChannelId }: Props) {
  const { screenshots, isLoading, error } = useGalleryVideoScreenshots({
    ytVideoId,
    ytChannelId,
  });

  const handleZoom = useZoomScreenshot();
  const handleSetFeatured = useSetFeaturedScreenshot();
  const handleDelete = useDeleteWithConfirm();

  const groupedScreenshotsByTime = useGroupScreenshotsByTime();

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
                    isFav={screenshot.isFav ?? undefined}
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
