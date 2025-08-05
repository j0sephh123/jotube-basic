import { useStore } from "@/store/store";
import { useGetUploadsWithThumbnails } from "@/features/Thumbnail/hooks/useGetUploadsWithThumbnails";
import { useThumbnailsView } from "@/features/Dashboard/views/ThumbnailsView/useThumbnailsView";
import Card from "../../../../shared/components/card";
import CardsGridWrapper from "../../components/CardsGridWrapper";

export default function ThumbnailsView() {
  const {
    data: { thumbnailChannels } = {
      thumbnailChannels: [],
    },
  } = useThumbnailsView();
  const { setThumbnailsProcessingData } = useStore();
  const { mutateAsync: getUploadsWithThumbnailsMutation } =
    useGetUploadsWithThumbnails();

  const handleThumbnailClick = async (channelId: number) => {
    const thumbnails = await getUploadsWithThumbnailsMutation([channelId]);
    setThumbnailsProcessingData(thumbnails);
  };

  return (
    <div className="fixed inset-0 flex flex-col mt-32">
      <CardsGridWrapper
        isEmpty={!thumbnailChannels.length}
        className="bg-base-100"
      >
        {thumbnailChannels.map(({ id, ytId, title, src, uploadsCount }) => (
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
    </div>
  );
}
