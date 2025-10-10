import {
  Button,
  CopyValue,
  OpenDirectoryButton,
  useClickOutside,
  ButtonWithBadge,
} from "@shared/ui";
import { IdType, type FeaturedScreenshotResponse } from "@shared/api";
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
import { SyncUploadsButton } from "@features/Upload";
import { useState, useRef } from "react";

type ChannelTableRowProps = {
  id: number;
  ytId: string;
  title: string;
  src: string;
  lastSyncedAt?: string | null;
  screenshotsCount: number;
  thumbnails: number;
  saved: number;
  defaults: number;
  storyboard: number;
  createdAt: string;
  videoCount: number;
  playlist?: {
    id: number;
    name: string;
  } | null;
  featuredScreenshots: FeaturedScreenshotResponse[];
  onChannelDelete?: () => void;
  onSyncUploads?: () => void;
  showPlaylistColumn?: boolean;
  viewType?: string;
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

export default function ChannelTableRow({
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
  videoCount: _videoCount,
  playlist,
  featuredScreenshots,
  onChannelDelete,
  onSyncUploads,
  showPlaylistColumn = true,
  viewType,
}: ChannelTableRowProps) {
  const navigate = useCustomNavigate();
  const handleViewScreenshots = useScreenshotsForCarousel();
  const viewThumbnails = useViewThumbnails();
  const viewStoryboards = useGetUploadsWithStoryboards();

  const { getSrc, handleThumbnailClick } = useFeaturedScreenshots(
    featuredScreenshots,
    src
  );

  const getActionButton = () => {
    if (viewType === "no-screenshots") {
      return null;
    }
    const fetchUploadsTypes = ["no-uploads"];
    return fetchUploadsTypes.includes(viewType || "") ? (
      <Button size="sm">Fetch Uploads</Button>
    ) : (
      <SyncUploadsButton
        lastSyncedAt={lastSyncedAt}
        id={id}
        onSuccess={onSyncUploads}
      />
    );
  };

  const getDeleteButton = () => {
    if (viewType === "no-screenshots") {
      return null;
    }
    const deleteChannelTypes = ["no-uploads"];
    return deleteChannelTypes.includes(viewType || "") ? (
      <DeleteChannel id={id} onSuccess={onChannelDelete} />
    ) : null;
  };

  const getStatsDisplay = () => {
    const statsTypes = ["thumbnails", "processed", "saved", "storyboards"];

    if (statsTypes.includes(viewType || "")) {
      const stats = [
        {
          icon: <FileVideo className="w-4 h-4" />,
          text: "Default",
          value: defaults,
          statType: "default" as const,
          onClick: () => navigate(`/channels/${makeYtChannelId(ytId)}`),
        },
        {
          icon: <Bookmark className="w-4 h-4" />,
          text: "Saved",
          value: saved,
          statType: "saved" as const,
          onClick: () => navigate(`/channels/${makeYtChannelId(ytId)}/saved`),
        },
        {
          icon: <Camera className="w-4 h-4" />,
          text: "Screenshots",
          value: screenshotsCount,
          statType: "screenshots" as const,
          onClick: () => handleViewScreenshots([id]),
        },
        {
          icon: <Image className="w-4 h-4" />,
          text: "Thumbnails",
          value: thumbnails,
          statType: "thumbnails" as const,
          onClick: () =>
            viewThumbnails({ channelIds: [id], idType: IdType.Channel }),
        },
        {
          icon: <Film className="w-4 h-4" />,
          text: "Storyboards",
          value: storyboard,
          statType: "storyboards" as const,
          onClick: () => viewStoryboards.mutateAsync([id]),
        },
        {
          icon: <Images className="w-4 h-4" />,
          text: "Gallery",
          value: screenshotsCount,
          statType: "screenshots" as const,
          onClick: () => {
            setGalleryModal({
              collectionItemId: "",
              collectionIds: [id],
            });
          },
        },
      ];

      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {stats.slice(0, 3).map((stat) => (
              <ButtonWithBadge
                key={stat.text}
                icon={stat.icon}
                text={stat.text}
                numVal={stat.value}
                statType={stat.statType}
                onClick={stat.onClick}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {stats.slice(3, 6).map((stat) => (
              <ButtonWithBadge
                key={stat.text}
                icon={stat.icon}
                text={stat.text}
                numVal={stat.value}
                statType={stat.statType}
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
      {showPlaylistColumn && (
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
      )}
      <td>
        <div className="flex items-center gap-2">
          {getActionButton()}
          {getDeleteButton()}
          <CardMenu id={id} ytId={ytId} />
        </div>
      </td>
    </tr>
  );
}
