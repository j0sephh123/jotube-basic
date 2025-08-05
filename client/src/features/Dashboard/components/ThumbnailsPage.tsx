import { useStore } from "@/store/store";
import { useGetUploadsWithThumbnails } from "@/features/Thumbnail/hooks/useGetUploadsWithThumbnails";
import { useGroupedThumbnails } from "@/features/Thumbnail/hooks/useGroupedThumbnails";
import ViewAllThumbnailsButton from "@/features/Thumbnail/components/ViewAllThumbnailsButton";
import { useMemo } from "react";
import Card from "../../../shared/components/card";
import CardsGridWrapper from "./CardsGridWrapper";

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
      <CardsGridWrapper
        isEmpty={!sortedChannels.length}
        className="bg-base-100"
      >
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
      </CardsGridWrapper>

      <div className="flex-none p-4 border-t border-gray-700 bg-base-100 flex justify-center">
        <ViewAllThumbnailsButton />
      </div>
    </div>
  );
}
