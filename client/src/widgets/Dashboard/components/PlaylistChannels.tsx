import { ViewType } from "@features/Dashboard";
import { PlaylistDetailsContainer } from "@widgets/PlaylistDetails";
import {
  Button,
  Tooltip,
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
} from "lucide-react";
import { setGalleryModal } from "@features/Gallery";
import {
  useFeaturedScreenshots,
  useScreenshotsForCarousel,
} from "@features/Screenshot";
import { useViewThumbnails } from "@features/Thumbnails";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { useCustomNavigate } from "@shared/hooks";
import { makeYtChannelId } from "@shared/types";
import { DeleteChannel } from "@entities/Channel";
import { formatLastSync } from "@shared/ui";
import { useState, useRef } from "react";

type PlaylistChannelRowProps = {
  id: number;
  ytId: string;
  title: string;
  src: string;
  videoCount: number;
  saved: number;
  screenshotsCount: number;
  thumbnails: number;
  storyboard: number;
  lastSyncedAt?: string | null;
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

function PlaylistChannelRow({
  id,
  ytId,
  title,
  src,
  videoCount,
  saved,
  screenshotsCount,
  thumbnails,
  storyboard,
  lastSyncedAt,
  featuredScreenshots,
  onSyncUploads,
}: PlaylistChannelRowProps) {
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

  const getStatsDisplay = () => {
    const stats = [
      {
        icon: <FileVideo className="w-4 h-4" />,
        text: "Default",
        value: videoCount,
        onClick: () => navigate(`/channels/${makeYtChannelId(ytId)}`),
      },
      {
        icon: <Bookmark className="w-4 h-4" />,
        text: "Saved",
        value: saved,
        onClick: () => navigate(`/channels/${makeYtChannelId(ytId)}/saved`),
      },
      {
        icon: <Camera className="w-4 h-4" />,
        text: "Screenshots",
        value: screenshotsCount,
        onClick: () => handleViewScreenshots([id]),
      },
      {
        icon: <Image className="w-4 h-4" />,
        text: "Thumbnails",
        value: thumbnails,
        onClick: () =>
          viewThumbnails({ channelIds: [id], idType: IdType.Channel }),
      },
      {
        icon: <Film className="w-4 h-4" />,
        text: "Storyboards",
        value: storyboard,
        onClick: () => viewStoryboards.mutateAsync([id]),
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
              onClick={stat.onClick}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {stats.slice(3, 5).map((stat) => (
            <ButtonWithBadge
              key={stat.text}
              icon={stat.icon}
              text={stat.text}
              numVal={stat.value}
              onClick={stat.onClick}
            />
          ))}
        </div>
      </div>
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

export const PlaylistChannels = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist, refetch) => (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Stats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {playlist?.channels.map((channel) => (
                <PlaylistChannelRow
                  key={channel.id}
                  id={channel.id}
                  ytId={channel.ytId}
                  title={channel.title}
                  src={channel.src}
                  videoCount={channel.videoCount}
                  saved={channel.saved}
                  screenshotsCount={channel.screenshotCount}
                  thumbnails={channel.thumbnailCount}
                  storyboard={0}
                  lastSyncedAt={channel.lastSyncedAt}
                  featuredScreenshots={channel.featuredScreenshots}
                  onSyncUploads={refetch}
                />
              )) || []}
            </tbody>
          </table>
        </div>
      )}
    </PlaylistDetailsContainer>
  );
};
