import { useTypedChannelYtId } from "@features/Dashboard";
import { useFetchChannelScreenshots } from "@features/Screenshot";
import { GalleryItem } from "@widgets/Gallery";
import { Gallery } from "@widgets/Gallery";

export default function GalleryPage() {
  const ytChannelId = useTypedChannelYtId();

  const {
    data: screenshots,
    isLoading,
    error,
  } = useFetchChannelScreenshots(ytChannelId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Gallery...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Gallery</h1>
          <p className="text-red-400">Failed to load screenshots</p>
        </div>
      </div>
    );
  }

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Screenshots Found</h1>
          <p className="text-gray-400">This channel has no screenshots yet.</p>
        </div>
      </div>
    );
  }

  const handleScrollProgress = (scrollProgress: number) => {
    console.log(`Scroll progress: ${(scrollProgress * 100).toFixed(1)}%`);
  };

  return (
    <div className="flex w-full mt-16 h-[92vh]">
      <Gallery
        onScrollProgress={handleScrollProgress}
        items={screenshots}
        ItemComponent={GalleryItem}
      />
      <div>right</div>
    </div>
  );
}
