import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/utils/routes";
import CardContainer from "./CardContainer";
import CardImage from "./CardImage";
import CardContent from "./CardContent";
import CardTitle from "./CardTitle";
import CardStats from "./CardStats";
import CardMenu from "./CardMenu";
import CardDeleteButton from "./CardDeleteButton";
import CardDownloadButton from "./CardDownloadButton";

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
}: CardProps) {
  const navigate = useNavigate();

  const handleChannelTitleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(routes.savedChannel(ytId));
  };

  return (
    <Card.Container>
      <Card.Image
        id={id}
        ytId={ytId}
        src={src}
        ytChannelId={ytChannelId}
        screenshots={screenshots}
      />
      <Card.Content>
        <Card.Title title={title} onClick={handleChannelTitleClick} />
        {cardStatsSlot}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {actionButtonSlot}
            {downloadButtonSlot}
            {deleteButtonSlot}
          </div>
          {cardMenuSlot}
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

export default Card;
