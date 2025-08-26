import {
  useDeleteWithConfirm,
  useFetchChannelScreenshots,
  useSetFeaturedScreenshot,
  useZoomScreenshot,
} from "@features/Screenshot";
import { StaticStates } from "@shared/ui";
import { GalleryVirtualised } from "./GalleryVirtualised";
import GalleryItem from "./GalleryItem";
import { useTypedChannelYtId } from "@features/Dashboard";

export function NewGallery() {
  const ytChannelId = useTypedChannelYtId();
  const { data: screenshots, isLoading, error } = useFetchChannelScreenshots(ytChannelId);

  const handleScrollProgress = (scrollProgress: number) => {
    console.log(`Scroll progress: ${(scrollProgress * 100).toFixed(1)}%`);
  };

  const handleSetFeatured = useSetFeaturedScreenshot();
  const handleDelete = useDeleteWithConfirm();
  const handleZoom = useZoomScreenshot();

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={screenshots?.length === 0}
    >
      <div className="flex w-full mt-16 h-[92vh]">
        <GalleryVirtualised
          onScrollProgress={handleScrollProgress}
          items={screenshots ?? []}
          ItemComponent={({ item }) => (
            <GalleryItem
              screenshot={item}
              onFavorite={handleSetFeatured}
              onDelete={handleDelete}
              onImageClick={handleZoom}
            />
          )}
        />
        <div>right</div>
      </div>
    </StaticStates>
  );
}
