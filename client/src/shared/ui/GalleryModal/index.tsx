/* eslint-disable boundaries/element-types */
import { useGalleryModalState } from "@app/providers";
import { closeGalleryModal } from "@features/Gallery";
import { useGalleryScreenshots } from "@features/Gallery";
import {
  useDeleteWithConfirm,
  useSetFeaturedScreenshot,
  useZoomScreenshot,
} from "@features/Screenshot";
import { StaticStates } from "..";
import { GalleryItem } from "@features/Gallery";
import { useKbdEvent } from "@features/Thumbnails";
import { Virtualizer } from "@widgets/Virtualizer";
import { GalleryModalWrapper } from "./GalleryModalWrapper";

export function GalleryModal() {
  const { isVisible, collectionIds, collectionItemId } = useGalleryModalState();

  const { videoScreenshots, screenshots, isLoading, error } =
    useGalleryScreenshots({
      collectionItemId,
      collectionIds: [...collectionIds],
    });

  const screenshotsToUse =
    collectionItemId === "" ? screenshots : videoScreenshots;

  const handleZoom = useZoomScreenshot();
  const handleSetFeatured = useSetFeaturedScreenshot();
  const handleDelete = useDeleteWithConfirm();

  useKbdEvent(() => {
    closeGalleryModal();
  }, "Escape");

  if (!isVisible) return null;

  return (
    <GalleryModalWrapper>
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
    </GalleryModalWrapper>
  );
}
