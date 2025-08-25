import { useFetchChannelScreenshots } from "@features/Screenshot";
import { StaticStates } from "@shared/ui";
import { GalleryVirtualised } from "./GalleryVirtualised";
import { GalleryVirtualisedItem } from "./GalleryVirtualisedItem";

export function NewGallery() {
  const { data: screenshots, isLoading, error } = useFetchChannelScreenshots();

  const handleScrollProgress = (scrollProgress: number) => {
    console.log(`Scroll progress: ${(scrollProgress * 100).toFixed(1)}%`);
  };

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
          ItemComponent={GalleryVirtualisedItem}
        />
        <div>right</div>
      </div>
    </StaticStates>
  );
}