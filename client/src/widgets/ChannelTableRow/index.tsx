import { ButtonWithBadge } from "@shared/ui";
/* eslint-disable import/no-internal-modules */
import { StoryboardButton } from "@features/Channel/components/StoryboardButton";
import { IdType, type FeaturedScreenshotResponse } from "@shared/api";
import {
  Images,
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
import {
  PlaylistControl,
  setPlaylistModal,
  useRemoveFromPlaylist,
} from "@features/Playlist";
import { useCustomNavigate } from "@shared/hooks";
import { useLocation } from "react-router-dom";
import { makeYtChannelId } from "@shared/types";
import { DeleteChannel } from "@entities/Channel";
import { formatLastSync } from "@shared/ui";
import { SyncUploadsButton, FetchUploadsButton } from "@features/Upload";
import { CardMenu } from "./CardMenu";

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
  hidePlaylistName?: boolean;
};

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
  hidePlaylistName = false,
}: ChannelTableRowProps) {
  const navigate = useCustomNavigate();
  const location = useLocation();
  const handleViewScreenshots = useScreenshotsForCarousel();
  const viewThumbnails = useViewThumbnails();
  const viewStoryboards = useGetUploadsWithStoryboards();
  const { handleRemoveFromPlaylist } = useRemoveFromPlaylist();

  const isInPlaylistContext = location.pathname.includes(
    "/playlists/channels/"
  );

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
      <FetchUploadsButton
        channelId={id}
        videoCount={_videoCount}
        onSuccess={onSyncUploads}
      />
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

  const getVideosDisplay = () => {
    return (
      <div className="flex flex-col gap-1">
        <ButtonWithBadge
          icon={<FileVideo className="w-4 h-4" />}
          text="Default"
          numVal={defaults}
          statType="default"
          onClick={() => navigate(`/channels/${makeYtChannelId(ytId)}`)}
        />
        <ButtonWithBadge
          icon={<Bookmark className="w-4 h-4" />}
          text="Saved"
          numVal={saved}
          statType="saved"
          onClick={() => navigate(`/channels/${makeYtChannelId(ytId)}/saved`)}
        />
      </div>
    );
  };

  const getScreenshotsDisplay = () => {
    return (
      <div className="flex flex-col gap-1">
        <ButtonWithBadge
          icon={<Camera className="w-4 h-4" />}
          text="Screenshots"
          numVal={screenshotsCount}
          statType="screenshots"
          onClick={() => handleViewScreenshots([id])}
        />
        <ButtonWithBadge
          icon={<Images className="w-4 h-4" />}
          text="Gallery"
          numVal={screenshotsCount}
          statType="screenshots"
          onClick={() => {
            setGalleryModal({
              collectionItemId: "",
              collectionIds: [id],
            });
          }}
        />
      </div>
    );
  };

  const getStatsDisplay = () => {
    const statsTypes = ["thumbnails", "processed", "saved", "storyboards"];

    if (statsTypes.includes(viewType || "")) {
      const stats = [
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
      ];

      return (
        <div className="flex items-center gap-2">
          {stats.map((stat) => (
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
      );
    }
    return (
      <span className="text-sm text-gray-400">{formatLastSync(createdAt)}</span>
    );
  };

  return (
    <tr className="hover group">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16">
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
            <div className="mt-1 flex items-center gap-2">
              {playlist && !hidePlaylistName ? (
                <PlaylistControl
                  id={id}
                  playlistId={playlist.id}
                  playlistName={playlist.name}
                  size="sm"
                />
              ) : !isInPlaylistContext ? (
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
              ) : null}
              {getActionButton()}
            </div>
          </div>
        </div>
      </td>
      <td className="py-2">
        <div className="flex flex-col gap-1">{getVideosDisplay()}</div>
      </td>
      <td className="py-2">
        <div className="flex flex-col gap-1">{getScreenshotsDisplay()}</div>
      </td>
      <td className="py-2">
        <div className="flex flex-col gap-1">{getStatsDisplay()}</div>
      </td>
      {showPlaylistColumn && (
        <td>
          <div className="flex items-center gap-2">
            {playlist ? (
              <div className="flex items-center gap-1">
                {!hidePlaylistName && (
                  <PlaylistControl
                    id={id}
                    playlistId={playlist.id}
                    playlistName={playlist.name}
                    size="sm"
                  />
                )}
              </div>
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
      <td className="py-2">
        <div className="flex items-center gap-2">
          {getDeleteButton()}
          <StoryboardButton ytChannelId={ytId} className="btn-sm" />
          <CardMenu
            id={id}
            ytId={ytId}
            playlist={playlist}
            onRemoveFromPlaylist={handleRemoveFromPlaylist}
          />
        </div>
      </td>
    </tr>
  );
}
