import { useStore } from "@/store/store";
import { useGetUploadsWithThumbnails } from "@/features/Thumbnail/hooks/useGetUploadsWithThumbnails";
import { useGroupedThumbnails } from "@/features/Thumbnail/hooks/useGroupedThumbnails";
import ViewAllThumbnailsButton from "@/features/Thumbnail/components/ViewAllThumbnailsButton";
import { useMemo } from "react";
import Card from "../../../shared/components/card";

export default function ThumbnailsPage() {
  const {
    data: { thumbnailChannels } = {
      thumbnailChannels: [],
    },
  } = useGroupedThumbnails();
  const { setThumbnailsProcessingData } = useStore();
  const { mutateAsync: getUploadsWithThumbnailsMutation } =
    useGetUploadsWithThumbnails();

  const sortedChannels = useMemo(
    () =>
      [...thumbnailChannels].sort((a, b) => b.uploadsCount - a.uploadsCount),
    [thumbnailChannels]
  );

  const handleThumbnailClick = async (channelId: number) => {
    const thumbnails = await getUploadsWithThumbnailsMutation([channelId]);
    setThumbnailsProcessingData(thumbnails);
  };

  return (
    <div className="fixed inset-0 flex flex-col mt-32">
      <div className="flex-none px-4 border-b border-gray-700 bg-base-100">
        <div className="flex justify-between items-center mb-4">
          <div className="text-base font-medium tracking-wide">
            Channels with thumbnails
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 bg-base-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          {sortedChannels.map(({ id, ytId, title, src, uploadsCount }) => (
            <Card
              key={id}
              id={id}
              ytId={ytId}
              title={title}
              src={src}
              thumbnails={uploadsCount}
              showSyncButton={false}
              showCardMenu={false}
              showStats={false}
              showActionButtons={false}
              onThumbnailClick={() => handleThumbnailClick(id)}
            />
          ))}
        </div>
      </div>

      <div className="flex-none p-4 border-t border-gray-700 bg-base-100 flex justify-center">
        <ViewAllThumbnailsButton />
      </div>
    </div>
  );
}
