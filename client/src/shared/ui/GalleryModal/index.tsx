/* eslint-disable boundaries/element-types */
import { useGalleryModal } from "@app/providers";
import { useGalleryVideoScreenshots } from "@features/Gallery";
import {
  useDeleteWithConfirm,
  useSetFeaturedScreenshot,
  useZoomScreenshot,
} from "@features/Screenshot";
import { StaticStates } from "..";
import { GalleryItem } from "@features/Gallery";
import { createPortal } from "react-dom";

export function GalleryModal() {
  const { isGalleryModalVisible, closeGalleryModal, ytChannelId, ytVideoId } =
    useGalleryModal();

  const { videoScreenshots, isLoading, error } = useGalleryVideoScreenshots({
    ytVideoId,
    ytChannelId,
  });

  const handleZoom = useZoomScreenshot();
  const handleSetFeatured = useSetFeaturedScreenshot();
  const handleDelete = useDeleteWithConfirm();

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
            isEmpty={videoScreenshots?.length === 0}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videoScreenshots?.map((screenshot) => (
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
          </StaticStates>
        </div>
      </div>
    </div>,
    document.body
  );
}
