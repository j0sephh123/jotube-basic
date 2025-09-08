/* eslint-disable boundaries/element-types */
import { useGalleryModalState } from "@app/providers";
import { closeGalleryModal } from "@features/Gallery";
import { useScreenshotsForGallery } from "@features/Gallery";
import {
  useDeleteWithConfirm,
  useSetFeaturedScreenshot,
  useZoomScreenshot,
} from "@features/Screenshot";
import { StaticStates } from "..";
import { GalleryItem } from "@features/Gallery";
import { createPortal } from "react-dom";
import { useKbdEvent } from "@features/Thumbnails";
import { Virtualizer } from "@widgets/Virtualizer";

export function GalleryModal() {
  const { isGalleryModalVisible, channelIds, ytVideoId } = useGalleryModalState();

  const { videoScreenshots, screenshots, isLoading, error } =
    useScreenshotsForGallery({
      ytVideoId,
      channelIds: [...channelIds],
    });

  const screenshotsToUse = ytVideoId === "" ? screenshots : videoScreenshots;

  const handleZoom = useZoomScreenshot();
  const handleSetFeatured = useSetFeaturedScreenshot();
  const handleDelete = useDeleteWithConfirm();

  useKbdEvent(() => {
    closeGalleryModal();
  }, "Escape");

  if (!isGalleryModalVisible) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: 99999 }}
      onClick={closeGalleryModal}
    >
      <div
        className="bg-base-100 w-full h-full p-0 relative overflow-hidden"
        style={{ maxWidth: "100vw", maxHeight: "100vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="btn btn-lg btn-circle btn-ghost absolute right-4 top-4 z-50"
          onClick={closeGalleryModal}
        >
          ✕
        </button>
        <div className="w-full h-full p-4 overflow-y-auto">
          <StaticStates
            isLoading={isLoading}
            isError={!!error}
            isEmpty={screenshotsToUse?.length === 0}
          >
            <Virtualizer
              className="h-[97vh]"
              items={screenshotsToUse ?? []}
              ItemComponent={({ item }) => (
                <GalleryItem
                  screenshot={item}
                  onFavorite={handleSetFeatured}
                  onDelete={handleDelete}
                  onImageClick={handleZoom}
                />
              )}
            />
          </StaticStates>
        </div>
      </div>
    </div>,
    document.body
  );
}
