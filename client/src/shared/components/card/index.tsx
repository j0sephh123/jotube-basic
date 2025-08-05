import { useState, useMemo } from "react";
import { Download, Trash2 } from "lucide-react";
import Avatar from "@/shared/components/Avatar";
import useSyncUploads from "@/features/Upload/hooks/useSyncUploads";
import { useOpenDirectory } from "@/shared/components/OpenDirectoryButton/useOpenDirectory";
import { useNavigate } from "react-router-dom";
import { getPublicImgUrl } from "@/shared/utils/image";
import { routes } from "@/shared/utils/routes";
import CardMenuWrapper from "./CardMenuWrapper";
import CardStats from "./CardStats";
import CardTitle from "./CardTitle";
import SyncButton from "./SyncButton";

type ItemProps = {
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
  onDownload?: (id: number) => void;
  onDelete?: (id: number) => void;
  screenshots?: {
    ytVideoId: string;
    second: number;
  }[];
  showSyncButton?: boolean;
  showCardMenu?: boolean;
  showStats?: boolean;
  showActionButtons?: boolean;
  onThumbnailClick?: () => void;
};

export default function Card({
  id,
  src,
  ytId,
  title,
  saved,
  thumbnails,
  defaults,
  screenshotsCount,
  ytChannelId,
  onDownload,
  onDelete,
  screenshots,
  lastSyncedAt,
  showSyncButton = true,
  showCardMenu = true,
  showStats = true,
  showActionButtons = true,
  onThumbnailClick,
}: ItemProps) {
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const syncUploads = useSyncUploads(ytChannelId || ytId);
  const handleOpenExplorer = useOpenDirectory({ ytChannelId: ytId });
  const navigate = useNavigate();

  const computedSrc = useMemo(() => {
    if (
      screenshots &&
      screenshots.length &&
      screenshots.length > 0 &&
      screenshots[0]?.ytVideoId
    ) {
      return getPublicImgUrl(
        ytChannelId || ytId,
        screenshots[screenshotIndex]?.ytVideoId || "0",
        screenshots[screenshotIndex]?.second || 0,
        "saved_screenshots"
      );
    }

    return src;
  }, [screenshots, screenshotIndex, ytChannelId, ytId, src]);

  const handleAvatarClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (onThumbnailClick) {
      onThumbnailClick();
      return;
    }

    if (screenshots && screenshots.length > 0) {
      setScreenshotIndex((prev) => (prev + 1) % screenshots.length);
    }
  };

  const handleSync = async () => {
    if (!ytChannelId) return;

    try {
      await syncUploads.mutateAsync({
        ytChannelId,
        channelId: id,
      });
    } catch (error) {
      console.error("Failed to sync channel:", error);
    }
  };

  const handleChannelTitleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(routes.savedChannel(ytId));
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload(id);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="flex flex-col w-full bg-gray-800 border-2 rounded-lg shadow-lg group relative border-gray-600 hover:border-gray-500">
      <div className="relative">
        <Avatar
          ytId={ytId}
          id={id}
          src={computedSrc}
          className={`w-full h-36 object-cover cursor-pointer`}
          onClick={handleAvatarClick}
        />
      </div>

      <div className="p-3 flex flex-col gap-2">
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
          <div className="flex items-center gap-2">
            {showSyncButton && ytChannelId && (
              <SyncButton
                lastSyncedAt={lastSyncedAt || null}
                syncUploadsIsPending={syncUploads.isPending}
                onClick={handleSync}
              />
            )}

            {showActionButtons && onDownload && (
              <button
                onClick={handleDownloadClick}
                className="btn btn-ghost btn-sm btn-circle hover:bg-gray-700/50 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4 text-blue-400" />
              </button>
            )}

            {showActionButtons && onDelete && (
              <button
                onClick={handleDeleteClick}
                className="btn btn-ghost btn-sm btn-circle hover:bg-gray-700/50 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            )}
          </div>

          {showCardMenu && (
            <CardMenuWrapper
              id={id}
              ytId={ytId}
              onOpenExplorer={handleOpenExplorer}
            />
          )}
        </div>
      </div>
    </div>
  );
}
