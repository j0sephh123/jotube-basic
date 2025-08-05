import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import { useDashboardQuery } from "@/features/Dashboard/views/useDashboardQuery";
import NoDataAvailable from "@/shared/components/static/NoDataAvailable";
import Card from "../../../shared/components/card";
import CardsGridWrapper from "../components/CardsGridWrapper";
import FetchUploadsButton from "@/features/Upload/components/FetchUploadsButton";
import DeleteChannel from "@/features/Channel/NewChannel/components/DeleteChannel";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";
import { DashboardChannel } from "./types";
import SyncUploadsButton from "@/features/Upload/components/SyncUploadsButton";

type ChannelWithUploadsCount = DashboardChannel & { uploadsCount: number };

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboardQuery();
  const viewType = useTypedViewType();

  const isSpecialView =
    viewType === ViewType.CHANNELS_WITHOUT_UPLOADS ||
    viewType === ViewType.CHANNELS_WITHOUT_SCREENSHOTS ||
    viewType === ViewType.THUMBNAILS;

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

  if (isSpecialView) {
    const isThumbnailsView = viewType === ViewType.THUMBNAILS;
    let channels: (DashboardChannel | ChannelWithUploadsCount)[] = [];
    let isEmpty = !data.channels?.length;

    if (data.channels) {
      if (isThumbnailsView) {
        channels = data.channels.map((channel) => ({
          ...channel,
          uploadsCount:
            "uploadsCount" in channel
              ? (channel as ChannelWithUploadsCount).uploadsCount
              : channel.thumbnails || 0,
        })) as (DashboardChannel & { uploadsCount: number })[];
        isEmpty = !channels.length;
      } else {
        channels = data.channels;
        isEmpty = !channels.length;
      }
    }

    return (
      <CardsGridWrapper isLoading={!data} isEmpty={isEmpty}>
        {channels.map((channel) => (
          <Card
            key={channel.id}
            id={channel.id}
            ytId={channel.ytId}
            title={channel.title}
            src={channel.src}
            deleteButtonSlot={<DeleteChannel id={channel.id} />}
            actionButtonSlot={
              !isThumbnailsView &&
              "videoCount" in channel && (
                <FetchUploadsButton
                  ytChannelId={channel.ytId}
                  videoCount={channel.videoCount}
                />
              )
            }
          />
        ))}
      </CardsGridWrapper>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <div className="flex-1">
        <CardsGridWrapper
          isEmpty={!data.channels || !Array.isArray(data.channels)}
          emptyMessage="No channels data available"
        >
          {data.channels?.map((channel) => {
            const cardStats = (
              <Card.Stats
                ytId={channel.ytId}
                screenshotsCount={channel.screenshotsCount}
                thumbnails={channel.thumbnails || 0}
                saved={channel.saved}
                defaults={channel.defaults}
              />
            );

            const cardMenu = <Card.Menu id={channel.id} ytId={channel.ytId} />;

            const syncButton = (
              <SyncUploadsButton
                lastSyncedAt={channel.lastSyncedAt || null}
                ytChannelId={channel.ytId}
                id={channel.id}
              />
            );

            const downloadButton = <Card.DownloadButton id={channel.id} />;
            const deleteButton = channel.ytId ? (
              <Card.DeleteButton ytChannelId={channel.ytId} />
            ) : null;

            return (
              <Card
                id={channel.id}
                title={channel.title}
                ytId={channel.ytId}
                src={channel.src}
                lastSyncedAt={channel.lastSyncedAt}
                key={channel.id}
                ytChannelId={channel.ytId}
                cardStatsSlot={cardStats}
                cardMenuSlot={cardMenu}
                actionButtonSlot={syncButton}
                downloadButtonSlot={downloadButton}
                deleteButtonSlot={deleteButton}
              />
            );
          })}
        </CardsGridWrapper>
      </div>
    </div>
  );
}
