import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/utils/routes";
import CardContainer from "./CardContainer";
import CardImage from "./CardImage";
import CardContent from "./CardContent";
import CardTitle from "./CardTitle";
import CardStats from "./CardStats";
import CardActions from "./CardActions";
import CardMenu from "./CardMenu";
import CardDeleteButton from "./CardDeleteButton";
import { useOpenDirectory } from "@/shared/components/OpenDirectoryButton/useOpenDirectory";

type CardProps = {
  id: number;
  src: string;
  ytId: string;
  title: string;
  saved?: number;
  thumbnails?: number;
  defaults?: number;
  uploadsWithScreenshots?: number;
  screenshotsCount?: number;
  ytChannelId?: string;
  lastSyncedAt?: string | null;
  screenshots?: {
    ytVideoId: string;
    second: number;
  }[];
  showSyncButton?: boolean;
  showCardMenu?: boolean;
  showStats?: boolean;
  showActionButtons?: boolean;
};

function Card({
  id,
  src,
  ytId,
  title,
  saved,
  thumbnails,
  defaults,
  screenshotsCount,
  ytChannelId,
  screenshots,
  lastSyncedAt,
  showSyncButton = true,
  showCardMenu = true,
  showStats = true,
  showActionButtons = true,
}: CardProps) {
  const handleOpenExplorer = useOpenDirectory({ ytChannelId: ytId });
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

        {showStats && (
          <CardStats
            ytId={ytId}
            screenshotsCount={screenshotsCount}
            thumbnails={thumbnails || 0}
            saved={saved}
            defaults={defaults}
          />
        )}

        <div className="flex items-center justify-between">
          <CardActions
            id={id}
            ytChannelId={ytChannelId}
            lastSyncedAt={lastSyncedAt}
            showSyncButton={showSyncButton}
            showActionButtons={showActionButtons}
          />

          {showCardMenu && (
            <CardMenu id={id} ytId={ytId} onOpenExplorer={handleOpenExplorer} />
          )}
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
Card.Actions = CardActions;
Card.Menu = CardMenu;
Card.DeleteButton = CardDeleteButton;

export default Card;
