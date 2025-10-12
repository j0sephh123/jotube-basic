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
import {
  StoryboardButton,
  BulkDownloadButton,
  useSavedVideos,
} from "@features/Channel";
import {
  PlaylistControl,
  setPlaylistModal,
  useRemoveFromPlaylist,
} from "@features/Playlist";
import { useCustomNavigate, useQueue } from "@shared/hooks";
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
  fetchedUntilEnd?: boolean;
  playlist?: {
    id: number;
    name: string;
  } | null;
  featuredScreenshots: FeaturedScreenshotResponse[];
  onChannelDelete?: () => void;
  onSyncUploads?: () => void;
  onUploadAction?: () => void;
  showPlaylistColumn?: boolean;
  viewType?: string;
  hidePlaylistName?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
};

export default function ChannelTableRow({
  id,
  ytId,
  title,
  src,
  lastSyncedAt,
  screenshotsCount,
  thumbnails,
  saved: _saved,
  defaults,
  storyboard,
  createdAt: _createdAt,
  videoCount: _videoCount,
  fetchedUntilEnd = true,
  playlist,
  featuredScreenshots,
  onChannelDelete,
  onSyncUploads,
  onUploadAction,
  showPlaylistColumn = true,
  viewType,
  hidePlaylistName = false,
  isSelected = false,
  onToggleSelect,
}: ChannelTableRowProps) {
  const navigate = useCustomNavigate();
  const location = useLocation();
  const handleViewScreenshots = useScreenshotsForCarousel();
  const viewThumbnails = useViewThumbnails();
  const viewStoryboards = useGetUploadsWithStoryboards();
  const { handleRemoveFromPlaylist } = useRemoveFromPlaylist();
  const { data: queueData = [] } = useQueue();
  const { savedVideos } = useSavedVideos(id);

  const isInPlaylistContext = location.pathname.includes(
    "/playlists/channels/"
  );

  const storyboardJobs = queueData.filter(
    (item) =>
      item.processingType === "storyboarding" &&
      item.ytChannelId === ytId &&
      (item.state === "active" || item.state === "waiting")
  );

  const downloadJobs = queueData.filter(
    (item) =>
      item.processingType === "download" &&
      item.ytChannelId === ytId &&
      (item.state === "active" || item.state === "waiting")
  );

  const isProcessingStoryboards = storyboardJobs.length > 0;
  const storyboardCount = storyboardJobs.length;
  const isProcessingDownloads = downloadJobs.length > 0;
  const downloadCount = downloadJobs.length;

  const { getSrc, handleThumbnailClick } = useFeaturedScreenshots(
    featuredScreenshots,
    src
  );

  const getActionButton = () => {
    if (viewType === "no-screenshots") {
      return null;
    }
    const fetchUploadsTypes = ["no-uploads"];
    const shouldShowFetchButton =
      fetchUploadsTypes.includes(viewType || "") || !fetchedUntilEnd;

    return shouldShowFetchButton ? (
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

  const getDefaultVideosDisplay = () => {
    return (
      <StatWithActions
        label="Default"
        value={defaults}
        layout="horizontal"
        leftAction={{
          icon: <FileVideo className="w-4 h-4" />,
          tooltip: "View Default Videos",
          onClick: () => navigate(`/channels/${makeYtChannelId(ytId)}`),
        }}
        rightAction={{
          icon: <StoryboardButton ytChannelId={ytId} />,
          tooltip: "Generate Storyboards",
          onClick: () => {},
        }}
      />
    );
  };

  const getSavedVideosDisplay = () => {
    const actualSavedCount = savedVideos?.length || 0;
    return (
      <StatWithActions
        label="Saved"
        value={actualSavedCount}
        layout="horizontal"
        leftAction={{
          icon: <Bookmark className="w-4 h-4" />,
          tooltip: "View Saved Videos",
          onClick: () => navigate(`/channels/${makeYtChannelId(ytId)}/saved`),
        }}
        rightAction={{
          icon: (
            <BulkDownloadButton
              channelId={id}
              onUploadAction={onUploadAction}
            />
          ),
          tooltip: "Bulk Download Videos",
          onClick: () => {},
        }}
      />
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
      />
    );
  };

  const getThumbnailsDisplay = () => {
    return (
      <StatWithActions
        label="Thumbnails"
        value={thumbnails}
        layout="horizontal"
        leftAction={{
          icon: <Image className="w-4 h-4" />,
          tooltip: "View Thumbnails",
          onClick: () =>
            viewThumbnails({ channelIds: [id], idType: IdType.Channel }),
        }}
      />
    );
  };

  return (
    <tr
      className={`hover group transition-colors ${
        isProcessingStoryboards ? "bg-pink-50/30" : ""
      } ${isProcessingDownloads ? "bg-sky-50/30" : ""} ${
        isSelected ? "bg-primary/10" : ""
      }`}
    >
      <td className="py-2">
        {onToggleSelect && (
          <label className="cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary"
              checked={isSelected}
              onChange={onToggleSelect}
            />
          </label>
        )}
      </td>
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
            <div className="flex items-center gap-2">
              <div
                className="font-bold text-lg cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => navigate(`/channels/${makeYtChannelId(ytId)}`)}
              >
                {title}
              </div>
              {isProcessingStoryboards && (
                <span className="badge badge-sm badge-warning">
                  {storyboardCount} storyboard
                </span>
              )}
              {isProcessingDownloads && (
                <span className="badge badge-sm bg-sky-500 text-white">
                  {downloadCount} downloading
                </span>
              )}
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
        <div className="flex flex-col gap-1">{getDefaultVideosDisplay()}</div>
      </td>
      <td className="py-2">
        <div className="flex flex-col gap-1">{getSavedVideosDisplay()}</div>
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
