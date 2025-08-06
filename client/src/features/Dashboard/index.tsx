import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import NoDataAvailable from "@/shared/components/static/NoDataAvailable";
import Card from "../../shared/components/card";
import CardsGridWrapper from "./components/CardsGridWrapper";
import FetchUploadsButton from "@/features/Upload/components/FetchUploadsButton";
import DeleteChannel from "@/features/Channel/NewChannel/components/DeleteChannel";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";
import SyncUploadsButton from "@/features/Upload/components/SyncUploadsButton";
import { useDashboardQuery } from "./useDashboardQuery";
import { DashboardChannel } from "./types";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboardQuery();
  const viewType = useTypedViewType();

  const isThumbnailsView = viewType === ViewType.THUMBNAILS;
  const isChannelsWithoutUploads =
    viewType === ViewType.CHANNELS_WITHOUT_UPLOADS;
  const isChannelsWithoutScreenshots =
    viewType === ViewType.CHANNELS_WITHOUT_SCREENSHOTS;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorMessage message="Error fetching dashboard data" />;
  }

  if (!data) {
    return <NoDataAvailable message="No data available" />;
  }

  const isEmpty = !data.channels?.length;

  const renderCard = (channel: DashboardChannel) => {
    const title = isThumbnailsView
      ? `${channel.title} ${channel.thumbnails || 0}`
      : channel.title;

    const isSpecialView =
      isThumbnailsView ||
      isChannelsWithoutUploads ||
      isChannelsWithoutScreenshots;

    const cardStats = !isSpecialView ? (
      <Card.Stats
        ytId={channel.ytId}
        screenshotsCount={channel.screenshotsCount}
        thumbnails={channel.thumbnails}
        saved={channel.saved}
        defaults={channel.defaults}
      />
    ) : undefined;

    const cardMenu = !isSpecialView ? (
      <Card.Menu id={channel.id} ytId={channel.ytId} />
    ) : undefined;

    const syncButton = !isSpecialView ? (
      <SyncUploadsButton
        lastSyncedAt={channel.lastSyncedAt}
        ytChannelId={channel.ytId}
        id={channel.id}
      />
    ) : undefined;

    const downloadButton = !isSpecialView ? (
      <Card.DownloadButton id={channel.id} />
    ) : undefined;
    const deleteButton =
      !isSpecialView && channel.ytId ? (
        <Card.DeleteButton ytChannelId={channel.ytId} />
      ) : undefined;

    const specialDeleteButton =
      isSpecialView && !isThumbnailsView ? (
        <DeleteChannel id={channel.id} />
      ) : undefined;

    const specialActionButton =
      isSpecialView && !isThumbnailsView ? (
        <FetchUploadsButton
          ytChannelId={channel.ytId}
          videoCount={channel.videoCount}
        />
      ) : undefined;

    return (
      <Card
        key={channel.id}
        id={channel.id}
        ytId={channel.ytId}
        title={title}
        src={channel.src}
        lastSyncedAt={!isSpecialView ? channel.lastSyncedAt : undefined}
        ytChannelId={!isSpecialView ? channel.ytId : undefined}
        cardStatsSlot={cardStats}
        cardMenuSlot={cardMenu}
        actionButtonSlot={isSpecialView ? specialActionButton : syncButton}
        downloadButtonSlot={downloadButton}
        deleteButtonSlot={isSpecialView ? specialDeleteButton : deleteButton}
      />
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <div className="flex-1">
        <CardsGridWrapper
          isEmpty={isEmpty}
          emptyMessage="No channels data available"
        >
          {data.channels?.map(renderCard)}
        </CardsGridWrapper>
      </div>
    </div>
  );
}
