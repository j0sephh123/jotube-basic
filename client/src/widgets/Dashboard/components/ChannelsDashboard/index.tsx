import { ChannelsDashboardContainer } from "@widgets/Dashboard";
import { useParams } from "react-router-dom";
import { type ViewType } from "@features/Dashboard";
import { ViewType as ViewTypeEnum } from "@features/Dashboard";
import { SyncUploadsButton, FetchUploadsButton } from "@features/Upload";
import {
  Button,
  Tooltip,
  CopyValue,
  OpenDirectoryButton,
  useClickOutside,
  ButtonWithBadge,
} from "@shared/ui";
import {
  IdType,
  type DashboardChannelResponse,
  type FeaturedScreenshotResponse,
} from "@shared/api";
import {
  Images,
  MoreVertical,
  FileVideo,
  Bookmark,
  Camera,
  Image,
  Film,
  ListMusic,
} from "lucide-react";
import { setGalleryModal } from "@features/Gallery";
import {
  useFeaturedScreenshots,
  useScreenshotsForCarousel,
} from "@features/Screenshot";
import { useViewThumbnails } from "@features/Thumbnails";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { PlaylistControl, setPlaylistModal } from "@features/Playlist";
import { useCustomNavigate } from "@shared/hooks";
import { makeYtChannelId } from "@shared/types";
import { DeleteChannel } from "@entities/Channel";
import { formatLastSync } from "@shared/ui";
import { useState, useRef } from "react";

const statsTypes = ["thumbnails", "processed", "saved", "storyboards"];
const fetchUploadsTypes = ["no-uploads"];
const deleteChannelTypes = ["no-uploads"];

type TableRowProps = DashboardChannelResponse & {
  viewType: string;
  onChannelDelete?: () => void;
  featuredScreenshots: FeaturedScreenshotResponse[];
  onSyncUploads?: () => void;
};

function CardMenu({ id, ytId }: { id: number; ytId: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsMenuOpen(false), isMenuOpen);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id.toString());
    setIsMenuOpen(false);
  };

  const handleCopyYoutubeId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ytId);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative flex-shrink-0" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className="btn btn-ghost btn-sm btn-circle transition-colors hover:bg-gray-700"
      >
        <MoreVertical className="w-4 h-4 text-gray-400" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-8 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-2 min-w-[200px] z-50">
          <div className="flex flex-col gap-1">
            <button
              onClick={handleCopyId}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded transition-colors"
            >
              <CopyValue type="id" value={id.toString()} />
              <span>Copy ID</span>
            </button>
            <button
              onClick={handleCopyYoutubeId}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded transition-colors"
            >
              <CopyValue type="youtube" value={ytId} />
              <span>Copy YouTube ID</span>
            </button>
            <OpenDirectoryButton collection={ytId} />
          </div>
        </div>
      )}
    </div>
  );
}

function TableRow({
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
  playlist,
  onChannelDelete,
  featuredScreenshots,
  onSyncUploads,
}: TableRowProps) {
  const navigate = useCustomNavigate();
  const handleViewScreenshots = useScreenshotsForCarousel();
  const viewThumbnails = useViewThumbnails();
  const viewStoryboards = useGetUploadsWithStoryboards();

  const { getSrc, handleThumbnailClick } = useFeaturedScreenshots(
    featuredScreenshots,
    src
  );

  const handleGalleryClick = () => {
    setGalleryModal({
      collectionItemId: "",
      collectionIds: [id],
    });
  };

  const getActionButton = () => {
    if (viewType === ViewTypeEnum.NO_SCREENSHOTS) {
      return null;
    }
    return fetchUploadsTypes.includes(viewType) ? (
      <FetchUploadsButton channelId={id} videoCount={videoCount} />
    ) : (
      <SyncUploadsButton
        lastSyncedAt={lastSyncedAt}
        id={id}
        onSuccess={onSyncUploads}
      />
    );
  };

  const getDeleteButton = () => {
    if (viewType === ViewTypeEnum.NO_SCREENSHOTS) {
      return null;
    }
    return deleteChannelTypes.includes(viewType) ? (
      <DeleteChannel id={id} onSuccess={onChannelDelete} />
    ) : null;
  };

  const getStatsDisplay = () => {
    if (statsTypes.includes(viewType)) {
      const stats = [
        {
          icon: <FileVideo className="w-4 h-4" />,
          text: "Default",
          value: defaults,
          tooltip: "Default videos",
          bgColor: "bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400",
          badgeColor: "badge-warning",
          onClick: () => navigate(`/channels/${makeYtChannelId(ytId)}`),
        },
        {
          icon: <Bookmark className="w-4 h-4" />,
          text: "Saved",
          value: saved,
          tooltip: "Saved videos",
          bgColor: "bg-blue-400/20 hover:bg-blue-400/30 text-blue-400",
          badgeColor: "badge-info",
          onClick: () => navigate(`/channels/${makeYtChannelId(ytId)}/saved`),
        },
        {
          icon: <Camera className="w-4 h-4" />,
          text: "Screenshots",
          value: screenshotsCount,
          tooltip: "Screenshots",
          bgColor: "bg-purple-400/20 hover:bg-purple-400/30 text-purple-400",
          badgeColor: "badge-secondary",
          onClick: () => handleViewScreenshots([id]),
        },
        {
          icon: <Image className="w-4 h-4" />,
          text: "Thumbnails",
          value: thumbnails,
          tooltip: "Thumbnails",
          bgColor: "bg-green-400/20 hover:bg-green-400/30 text-green-400",
          badgeColor: "badge-success",
          onClick: () =>
            viewThumbnails({ channelIds: [id], idType: IdType.Channel }),
        },
        {
          icon: <Film className="w-4 h-4" />,
          text: "Storyboards",
          value: storyboard,
          tooltip: "Storyboard",
          bgColor: "bg-red-400/20 hover:bg-red-400/30 text-red-400",
          badgeColor: "badge-error",
          onClick: () => viewStoryboards.mutateAsync([id]),
        },
      ];

      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {stats.slice(0, 3).map((stat) => (
              <ButtonWithBadge
                key={stat.tooltip}
                icon={stat.icon}
                text={stat.text}
                numVal={stat.value}
                onClick={stat.onClick}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {stats.slice(3, 5).map((stat) => (
              <ButtonWithBadge
                key={stat.tooltip}
                icon={stat.icon}
                text={stat.text}
                numVal={stat.value}
                onClick={stat.onClick}
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <span className="text-sm text-gray-400">{formatLastSync(createdAt)}</span>
    );
  };

  return (
    <tr className="hover group">
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={getSrc}
                alt={title}
                onClick={handleThumbnailClick}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="flex-1">
            <div
              className="font-bold cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => navigate(`/channels/${makeYtChannelId(ytId)}`)}
            >
              {title}
            </div>
            <div className="text-sm opacity-50">{ytId}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex flex-col gap-1">{getStatsDisplay()}</div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {playlist ? (
            <PlaylistControl
              id={id}
              playlistId={playlist.id}
              playlistName={playlist.name}
              size="sm"
            />
          ) : (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                className="btn btn-sm flex items-center gap-1 px-2 py-1 rounded-md text-sm"
                onClick={() =>
                  setPlaylistModal({
                    type: "modifyPlaylistForChannel",
                    channelId: id,
                    playlistId: 0,
                  })
                }
              >
                <ListMusic className="w-4 h-4" />
                <span className="text-xs">Add to Playlist</span>
              </button>
            </div>
          )}
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {getActionButton()}
          {getDeleteButton()}
          <Tooltip content="View Gallery" position="top">
            <Button onClick={handleGalleryClick} size="sm">
              <Images className="w-4 h-4" />
            </Button>
          </Tooltip>
          <CardMenu id={id} ytId={ytId} />
        </div>
      </td>
    </tr>
  );
}

export default function ChannelsDashboard() {
  const { viewType } = useParams<{ viewType: string }>();

  return (
    <ChannelsDashboardContainer>
      {(channels, refetch) => (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Stats</th>
                <th>Playlist</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {channels?.map((channel) => (
                <TableRow
                  key={channel.id}
                  id={channel.id}
                  ytId={channel.ytId}
                  title={channel.title}
                  src={channel.src}
                  lastSyncedAt={channel.lastSyncedAt}
                  screenshotsCount={channel.screenshotsCount}
                  thumbnails={channel.thumbnails}
                  saved={channel.saved}
                  defaults={channel.defaults}
                  storyboard={channel.storyboard}
                  createdAt={channel.createdAt}
                  videoCount={channel.videoCount}
                  playlist={channel.playlist}
                  viewType={viewType as unknown as ViewType}
                  onChannelDelete={refetch}
                  onSyncUploads={refetch}
                  featuredScreenshots={channel.featuredScreenshots}
                />
              )) || []}
            </tbody>
          </table>
        </div>
      )}
    </ChannelsDashboardContainer>
  );
}
