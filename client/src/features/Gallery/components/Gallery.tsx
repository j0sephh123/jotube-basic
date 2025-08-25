import {
  useDeleteWithConfirm,
  useFetchChannelScreenshots,
  useZoomScreenshot,
} from "@features/Screenshot";
import { GalleryItem } from "@features/Gallery";
import { StaticStates } from "@shared/ui";
import { useSetFavorite } from "@features/Screenshot";
import { useGroupScreenshotsByVideo } from "@features/Gallery";

export default function Gallery() {
  const { data: screenshots, isLoading, error } = useFetchChannelScreenshots();
  const groupedScreenshotsByVideo = useGroupScreenshotsByVideo(screenshots);
  const handleFavorite = useSetFavorite();
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
                {videoScreenshots.map((screenshot) => {
                  const globalIndex =
                    screenshots?.findIndex((s) => s.id === screenshot.id) ?? 0;

                  return (
                    <GalleryItem
                      key={screenshot.id}
                      screenshot={screenshot}
                      isFav={screenshot.isFav ?? undefined}
                      index={globalIndex ?? 0}
                      onFavorite={(index) =>
                        handleFavorite(index, videoScreenshots)
                      }
                      onDelete={(index) =>
                        handleDelete(index, videoScreenshots)
                      }
                      onImageClick={(index) =>
                        handleZoom(index, videoScreenshots)
                      }
                    />
                  );
                })}
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
