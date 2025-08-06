import CardContainer from "./CardContainer";
import CardImage from "./CardImage";
import CardContent from "./CardContent";
import CardTitle from "./CardTitle";
import CardStats from "./CardStats";
import CardMenu from "./CardMenu";
import CardDeleteButton from "./CardDeleteButton";
import CardDownloadButton from "./CardDownloadButton";
import CardCreatedAt from "./CardCreatedAt";

type CardProps = {
  id: number;
  src: string;
  ytId: string;
  title: string;
  ytChannelId?: string;
  lastSyncedAt?: string | null;
  screenshots?: {
    ytVideoId: string;
    second: number;
  }[];
  actionButtonSlot?: React.ReactNode;
  cardStatsSlot?: React.ReactNode;
  cardMenuSlot?: React.ReactNode;
  downloadButtonSlot?: React.ReactNode;
  deleteButtonSlot?: React.ReactNode;
  handleChannelTitleClick: (e: React.MouseEvent) => void;
};

function Card({
  id,
  src,
  ytId,
  title,
  cardStatsSlot,
  ytChannelId,
  screenshots,
  actionButtonSlot,
  cardMenuSlot,
  downloadButtonSlot,
  deleteButtonSlot,
  handleChannelTitleClick,
}: CardProps) {
  return (
    <Card.Container>
      <div className="relative group">
        <Card.Image
          id={id}
          ytId={ytId}
          src={src}
          ytChannelId={ytChannelId}
          screenshots={screenshots}
        />
        {cardMenuSlot && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            {cardMenuSlot}
          </div>
        )}
      </div>
      <Card.Content>
        <Card.Title title={title} onClick={handleChannelTitleClick} />
        {cardStatsSlot}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {actionButtonSlot}
            {downloadButtonSlot}
            {deleteButtonSlot}
          </div>
        </div>
      </Card.Content>
    </Card.Container>
  );
}

Card.Container = CardContainer;
Card.Image = CardImage;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Stats = CardStats;
Card.Menu = CardMenu;
Card.DeleteButton = CardDeleteButton;
Card.DownloadButton = CardDownloadButton;
Card.CreatedAt = CardCreatedAt;

export default Card;
