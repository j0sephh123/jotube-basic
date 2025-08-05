import Card from "../../../../shared/components/card";
import CardsGridWrapper from "../../components/CardsGridWrapper";
import { useNoUploadsView } from "../NoUploadsView/useNoUploadsView";

export default function NoScreenshotsView() {
  const { data, isLoading } = useNoUploadsView();

  return (
    <CardsGridWrapper
      isLoading={isLoading}
      isEmpty={!data?.length}
      gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2"
    >
      {data?.map((channel) => (
        <Card
          key={channel.id}
          id={channel.id}
          ytId={channel.ytId}
          title={channel.title}
          src={channel.src}
        />
      ))}
    </CardsGridWrapper>
  );
}
