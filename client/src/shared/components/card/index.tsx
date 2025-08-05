import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/utils/routes";
import CardContainer from "./CardContainer";
import CardImage from "./CardImage";
import CardContent from "./CardContent";
import CardTitle from "./CardTitle";
import CardStats from "./CardStats";
import CardMenu from "./CardMenu";
import CardDeleteButton from "./CardDeleteButton";
import SyncUploadsButton from "@/features/Upload/components/SyncUploadsButton";
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
  showSyncButton?: boolean;
  showActionButtons?: boolean;
  cardStatsSlot?: React.ReactNode;
  cardMenuSlot?: React.ReactNode;
};

function Card({
  id,
  src,
  ytId,
  title,
  cardStatsSlot,
  ytChannelId,
  screenshots,
  lastSyncedAt,
  showSyncButton = true,
  cardMenuSlot,
  showActionButtons = true,
}: CardProps) {
  const navigate = useNavigate();

  const handleChannelTitleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(routes.savedChannel(ytId));
  };

  return (
    <CardContainer>
      <CardImage
        id={id}
        ytId={ytId}
        src={src}
        ytChannelId={ytChannelId}
        screenshots={screenshots}
      />

      <CardContent>
        <CardTitle title={title} onClick={handleChannelTitleClick} />
        {cardStatsSlot}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {showSyncButton && ytChannelId && (
              <SyncUploadsButton
                lastSyncedAt={lastSyncedAt || null}
                ytChannelId={ytChannelId}
                id={id}
              />
            )}
            {showActionButtons && <CardDownloadButton id={id} />}
            {showActionButtons && ytChannelId && (
              <CardDeleteButton ytChannelId={ytChannelId} />
            )}
          </div>
          {cardMenuSlot}
        </div>
      </CardContent>
    </CardContainer>
  );
}

Card.Container = CardContainer;
Card.Image = CardImage;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Stats = CardStats;
Card.Menu = CardMenu;
Card.DeleteButton = CardDeleteButton;

export default Card;
