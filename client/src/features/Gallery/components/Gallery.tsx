import {
  useDeleteWithConfirm,
  useFetchChannelScreenshots,
  useZoomScreenshot,
} from "@features/Screenshot";
import { GalleryItem } from "@features/Gallery";
import { StaticStates } from "@shared/ui";
import { useSetFeaturedScreenshot } from "@features/Screenshot";
import { useGroupScreenshotsByVideo } from "@features/Gallery";

export default function Gallery() {
  const { data: screenshots, isLoading, error } = useFetchChannelScreenshots();
  const groupedScreenshotsByVideo = useGroupScreenshotsByVideo(screenshots);
  const handleSetFeatured = useSetFeaturedScreenshot();
  const handleDelete = useDeleteWithConfirm();
  const handleZoom = useZoomScreenshot();

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={screenshots?.length === 0}
    >
      <div className="p-6 pb-20">
        <div className="space-y-8">
          {groupedScreenshotsByVideo.map(
            ({ videoId, screenshots: videoScreenshots }) => (
              <GroupWrapper key={videoId} videoId={videoId}>
                {videoScreenshots.map((screenshot) => (
                  <GalleryItem
                    key={screenshot.id}
                    screenshot={screenshot}
                    isFav={screenshot.isFav ?? undefined}
                    onFavorite={() => handleSetFeatured(screenshot)}
                    onDelete={() => handleDelete(screenshot)}
                    onImageClick={() => handleZoom(screenshot)}
                  />
                ))}
              </GroupWrapper>
            )
          )}
        </div>
      </div>
    </StaticStates>
  );
}

function GroupWrapper({
  videoId,
  children,
}: {
  videoId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Video: {videoId}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}
