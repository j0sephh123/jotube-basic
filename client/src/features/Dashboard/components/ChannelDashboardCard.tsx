import { ViewType } from "@/shared/hooks/useDashboardParams";
import SyncUploadsButton from "../../Upload/components/SyncUploadsButton";
import Card from "@/shared/components/card";
import FetchUploadsButton from "../../Upload/components/FetchUploadsButton";
import DeleteChannel from "../../Channel/NewChannel/components/DeleteChannel";
import useTitleClick from "../hooks/useTitleClick";
import { DashboardChannel } from "../types";

const statsTypes = [
  ViewType.THUMBNAILS,
  ViewType.PROCESSED,
  ViewType.SAVED,
  ViewType.HAS_STORYBOARDS,
];
const fetchUploadsTypes = [ViewType.NO_UPLOADS];
const downloadTypes = [ViewType.THUMBNAILS, ViewType.PROCESSED, ViewType.SAVED];
const deleteChannelTypes = [ViewType.NO_UPLOADS];

type Props = DashboardChannel & {
  viewType: ViewType;
};

export default function ChannelDashboardCard({
  id,
  ytId,
  title,
  src,
  lastSyncedAt,
  screenshotsCount,
  thumbnails,
  saved,
  defaults,
  storyboard,
  createdAt,
  videoCount,
  viewType,
}: Props) {
  const cardStats = (
    <Card.Stats
      ytId={ytId}
      id={id}
      screenshotsCount={screenshotsCount}
      thumbnails={thumbnails}
      saved={saved}
      defaults={defaults}
      storyboard={storyboard}
    />
  );

  const cardCreatedAt = <Card.CreatedAt createdAt={createdAt} />;

  const cardMenu = <Card.Menu id={id} ytId={ytId} />;

  const syncButton = (
    <SyncUploadsButton lastSyncedAt={lastSyncedAt} ytChannelId={ytId} id={id} />
  );

  const downloadButton = <Card.DownloadButton id={id} />;

  const deleteUploadsButton = <Card.DeleteButton ytChannelId={ytId} />;

  const deleteChannelbutton = <DeleteChannel id={id} />;

  const fetchUploadsButton = (
    <FetchUploadsButton ytChannelId={ytId} videoCount={videoCount} />
  );

  const handleTitleClick = useTitleClick(
    {
      ytId,
      title,
      src,
      lastSyncedAt,
    },
    viewType
  );

  const getDeleteButtonSlot = () => {
    if (viewType === ViewType.NO_SCREENSHOTS) {
      return null;
    }
    return deleteChannelTypes.includes(viewType)
      ? deleteChannelbutton
      : deleteUploadsButton;
  };

  const getActionButtonSlot = () => {
    if (viewType === ViewType.NO_SCREENSHOTS) {
      return null;
    }
    return fetchUploadsTypes.includes(viewType)
      ? fetchUploadsButton
      : syncButton;
  };

  return (
    <Card
      key={id}
      id={id}
      ytId={ytId}
      title={title}
      src={src}
      lastSyncedAt={lastSyncedAt}
      ytChannelId={ytId}
      handleTitleClick={handleTitleClick}
      secondRow={statsTypes.includes(viewType) ? cardStats : cardCreatedAt}
      cardMenuSlot={cardMenu}
      actionButtonSlot={getActionButtonSlot()}
      downloadButtonSlot={
        downloadTypes.includes(viewType) ? downloadButton : undefined
      }
      deleteButtonSlot={getDeleteButtonSlot()}
    />
  );
}
