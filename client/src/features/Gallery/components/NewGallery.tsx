import { useDeleteWithConfirm, useFetchChannelScreenshots, useSetFavorite, useZoomScreenshot } from "@features/Screenshot";
import { StaticStates } from "@shared/ui";
import { GalleryVirtualised } from "./GalleryVirtualised";
import GalleryItem from "./GalleryItem";

export function NewGallery() {
  const { data: screenshots, isLoading, error } = useFetchChannelScreenshots();

  const handleScrollProgress = (scrollProgress: number) => {
    console.log(`Scroll progress: ${(scrollProgress * 100).toFixed(1)}%`);
  };

  const handleFavorite = useSetFavorite();
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
              onFavorite={handleFavorite}
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