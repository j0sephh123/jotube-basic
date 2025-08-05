
import { useThumbnailsView } from "@/features/Dashboard/views/ThumbnailsView/useThumbnailsView";
import Card from "../../../../shared/components/card";
import CardsGridWrapper from "../../components/CardsGridWrapper";

export default function ThumbnailsView() {
  const {
    data: { thumbnailChannels } = {
      thumbnailChannels: [],
    },
  } = useThumbnailsView();


  return (
    <div className="fixed inset-0 flex flex-col mt-32">
      <CardsGridWrapper
        isEmpty={!thumbnailChannels.length}
        className="bg-base-100"
      >
        {thumbnailChannels.map(({ id, ytId, title, src }) => (
          <Card
            key={id}
            id={id}
            ytId={ytId}
            title={title}
            src={src}
            showSyncButton={false}
            showActionButtons={false}
          />
        ))}
      </CardsGridWrapper>
    </div>
  );
}
