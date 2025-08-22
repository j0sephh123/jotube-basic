import { ConstructionIcon } from "lucide-react";
import { useTypedChannelYtId } from "@features/Dashboard";
import { useFetchChannelScreenshots } from "@features/Screenshot";

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

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="mb-6">
          <ConstructionIcon className="mx-auto h-24 w-24" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Gallery Under Construction
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Please select a video from the sidebar
        </p>
        <p className="text-sm text-gray-500">
          Click on any video in the left panel to view its screenshots
        </p>
      </div>
    </div>
  );
}
