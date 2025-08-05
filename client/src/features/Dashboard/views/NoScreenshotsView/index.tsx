import { useNoScreenshotsView } from "@/features/Dashboard/views/NoScreenshotsView/useNoScreenshotsView";
import Card from "../../../../shared/components/card";
import CardsGridWrapper from "../../components/CardsGridWrapper";

export default function NoScreenshotsView() {
  const { data: channelsWithoutScreenshots } = useNoScreenshotsView();

  return (
    <CardsGridWrapper
      isLoading={!channelsWithoutScreenshots}
      isEmpty={!channelsWithoutScreenshots?.channels?.length}
      gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2"
    >
      {channelsWithoutScreenshots?.channels?.map((channel) => (
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
