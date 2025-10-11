import { ButtonWithBadge } from "@shared/ui";
import StatWithActions from "@widgets/StatWithActions";
import { IdType, type FeaturedScreenshotResponse } from "@shared/api";
import { FileVideo, Bookmark, Camera, Image, ListMusic } from "lucide-react";
import { setGalleryModal } from "@features/Gallery";
import {
  useFeaturedScreenshots,
  useScreenshotsForCarousel,
} from "@features/Screenshot";
import { useViewThumbnails } from "@features/Thumbnails";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { StoryboardIcon } from "@features/Channel";
import {
  PlaylistControl,
  setPlaylistModal,
  useRemoveFromPlaylist,
} from "@features/Playlist";
import { useCustomNavigate } from "@shared/hooks";
import { useLocation } from "react-router-dom";
import { makeYtChannelId } from "@shared/types";
import { DeleteChannel } from "@entities/Channel";
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
  createdAt: _createdAt,
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
      <StatWithActions
        label="Screenshots"
        value={screenshotsCount}
        layout="horizontal"
        leftAction={{
          tooltip: "View Screenshots",
          onClick: () => handleViewScreenshots([id]),
        }}
        rightAction={{
          icon: <Camera className="w-4 h-4" />,
          tooltip: "View Gallery",
          onClick: () => {
            setGalleryModal({
              collectionItemId: "",
              collectionIds: [id],
            });
          },
        }}
      />
    );
  };

  const getStoryboardsDisplay = () => {
    return (
      <StatWithActions
        label="Storyboards"
        value={storyboard}
        layout="horizontal"
        leftAction={{
          tooltip: "View Storyboards",
          onClick: () => viewStoryboards.mutateAsync([id]),
        }}
        rightAction={{
          icon: <StoryboardIcon ytChannelId={ytId} />,
          tooltip: "Generate Storyboards",
          onClick: () => {},
        }}
      />
    );
  };

  const getThumbnailsDisplay = () => {
    return (
      <div className="flex items-center gap-2">
        <ButtonWithBadge
          icon={<Image className="w-4 h-4" />}
          text="Thumbnails"
          numVal={thumbnails}
          statType="thumbnails"
          onClick={() =>
            viewThumbnails({ channelIds: [id], idType: IdType.Channel })
          }
        />
      </div>
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
              className="font-bold text-lg cursor-pointer hover:text-blue-400 transition-colors"
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
        <div className="flex flex-col gap-1">{getStoryboardsDisplay()}</div>
      </td>
      <td className="py-2">
        <div className="flex flex-col gap-1">{getThumbnailsDisplay()}</div>
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
