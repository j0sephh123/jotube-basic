/* eslint-disable react-refresh/only-export-components */
import { type To } from "@shared/types";
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
  secondRow?: React.ReactNode;
  cardMenuSlot?: React.ReactNode;
  downloadButtonSlot?: React.ReactNode;
  deleteButtonSlot?: React.ReactNode;
  playlistButtonSlot?: React.ReactNode;
  galleryButtonSlot?: React.ReactNode;
  onThumbnailClick?: () => void;
  featuredScreenshotsLength?: number;
  to: To;
};

function Card({
  id,
  src,
  ytId,
  title,
  secondRow,
  ytChannelId,
  screenshots,
  actionButtonSlot,
  cardMenuSlot,
  downloadButtonSlot,
  deleteButtonSlot,
  playlistButtonSlot,
  galleryButtonSlot,
  onThumbnailClick,
  featuredScreenshotsLength,
  to,
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
          onThumbnailClick={onThumbnailClick || (() => {})}
        />
        {cardMenuSlot && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            {cardMenuSlot}
          </div>
        )}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <div className="badge badge-primary">
            {featuredScreenshotsLength ?? 0}
          </div>
        </div>
      </div>
      <Card.Content>
        <Card.Title title={title} to={to} />
        {secondRow}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {actionButtonSlot}
            {downloadButtonSlot}
            {deleteButtonSlot}
            {playlistButtonSlot}
            {galleryButtonSlot}
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
export { formatLastSync, getLastSyncColor } from "./helper";
