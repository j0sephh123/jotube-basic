import { useState, useEffect, useRef, useMemo } from "react";
import {
  MoreVertical,
  RefreshCw,
  Download,
  Trash2,
  FolderOpen,
} from "lucide-react";
import Avatar from "@/shared/components/Avatar";
import CopyValue from "@/shared/components/CopyValue";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";
import useSyncUploads from "@/features/Upload/hooks/useSyncUploads";
import { useOpenDirectory } from "@/shared/components/OpenDirectoryButton/useOpenDirectory";
import { useStore } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { getPublicImgUrl } from "@/shared/utils/image";
import { routes } from "@/shared/utils/routes";

type ItemProps = {
  id: number;
  src: string;
  ytId: string;
  title: string;
  saved?: number;
  thumbnails: number;
  defaults?: number;
  uploadsWithScreenshots?: number;
  screenshotsCount?: number;
  viewType?: string;
  ytChannelId: string;
  lastSyncedAt: string | null;
  onDownload?: (id: number) => void;
  onDelete?: (id: number) => void;
  screenshots?: {
    ytVideoId: string;
    second: number;
  }[];
};

const formatLastSync = (lastSyncedAt: string | null) => {
  if (!lastSyncedAt) return "Never synced";
  const date = new Date(lastSyncedAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 15) return "just now";
  if (diffSecs < 60) return `${diffSecs}s ago`;
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const getLastSyncColor = (lastSyncedAt: string | null) => {
  if (!lastSyncedAt) return "text-error";
  const date = new Date(lastSyncedAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "text-success";
  if (diffDays < 1) return "text-info";
  if (diffDays < 7) return "text-warning";
  return "text-error";
};

export default function Item({
  id,
  src,
  ytId,
  title,
  saved,
  thumbnails,
  defaults,
  screenshotsCount,
  viewType,
  ytChannelId,
  lastSyncedAt,
  onDownload,
  onDelete,
  screenshots,
}: ItemProps) {
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const { getScreenshots } = useArtifacts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const syncUploads = useSyncUploads(ytChannelId);
  const handleOpenExplorer = useOpenDirectory({ ytChannelId: ytId });
  const addToIgnoreList = useStore((state) => state.addToIgnoreList);
  const isIgnored = useStore((state) => state.isIgnored);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const computedSrc = useMemo(() => {
    if (
      screenshots &&
      screenshots.length &&
      screenshots.length > 0 &&
      screenshots[0]?.ytVideoId
    ) {
      return getPublicImgUrl(
        ytChannelId,
        screenshots[screenshotIndex]?.ytVideoId || "0",
        screenshots[screenshotIndex]?.second || 0,
        "saved_screenshots"
      );
    }

    return src;
  }, [screenshots, screenshotIndex, ytChannelId, src]);

  const handleAvatarClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (screenshots && screenshots.length > 0) {
      setScreenshotIndex((prev) => (prev + 1) % screenshots.length);
    }
  };

  const handleSync = async () => {
    try {
      await syncUploads.mutateAsync({
        ytChannelId,
        channelId: id,
      });
    } catch (error) {
      console.error("Failed to sync channel:", error);
    }
  };

  const handleAddToIgnoreList = () => {
    addToIgnoreList(ytId, title);
    setIsMenuOpen(false);
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

  const handleOpenExplorerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOpenExplorer();
    setIsMenuOpen(false);
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
        <div className="flex flex-col gap-1">
          <div
            className="text-base font-medium text-gray-200 hover:text-blue-400 hover:underline transition-colors line-clamp-2 cursor-pointer"
            onClick={handleChannelTitleClick}
          >
            {title}
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 text-lg font-bold">
          {viewType === "saved" ? (
            <>
              <div
                className="tooltip tooltip-top tooltip-primary cursor-pointer"
                data-tip="Screenshots"
                onClick={(event) => {
                  if (event.ctrlKey || event.metaKey) return;
                  getScreenshots([ytId]);
                }}
              >
                <span className="text-purple-400 hover:text-purple-300 transition-colors">
                  {screenshotsCount || 0}
                </span>
              </div>
              <span className="text-gray-500">|</span>
              <div
                className="tooltip tooltip-top tooltip-primary cursor-pointer"
                data-tip="Thumbnails"
                onClick={(event) => {
                  if (event.ctrlKey || event.metaKey) return;
                  navigate(routes.gallery(ytId));
                }}
              >
                <span className="text-green-400 hover:text-green-300 transition-colors">
                  {thumbnails}
                </span>
              </div>
              <span className="text-gray-500">|</span>
              <div
                className="tooltip tooltip-top tooltip-primary"
                data-tip="Saved videos"
              >
                <span className="text-blue-400">{saved || 0}</span>
              </div>
              <span className="text-gray-500">|</span>
              <div
                className="tooltip tooltip-top tooltip-primary"
                data-tip="Default videos"
              >
                <span className="text-yellow-400">{defaults || 0}</span>
              </div>
              <span className="text-gray-500">|</span>
            </>
          ) : (
            <>
              <div
                className="tooltip tooltip-top tooltip-primary cursor-pointer"
                data-tip="Screenshots"
                onClick={(event) => {
                  if (event.ctrlKey || event.metaKey) return;
                  getScreenshots([ytId]);
                }}
              >
                <span className="text-purple-400 hover:text-purple-300 transition-colors">
                  {screenshotsCount || 0}
                </span>
              </div>
              <span className="text-gray-500">|</span>
              <div
                className="tooltip tooltip-top tooltip-primary cursor-pointer"
                data-tip="Thumbnails"
                onClick={(event) => {
                  if (event.ctrlKey || event.metaKey) return;
                  navigate(routes.gallery(ytId));
                }}
              >
                <span className="text-green-400 hover:text-green-300 transition-colors">
                  {thumbnails}
                </span>
              </div>
              <span className="text-gray-500">|</span>
              <div
                className="tooltip tooltip-top tooltip-primary"
                data-tip="Saved videos"
              >
                <span className="text-blue-400">{saved || 0}</span>
              </div>
              <span className="text-gray-500">|</span>
              <div
                className="tooltip tooltip-top tooltip-primary"
                data-tip="Default videos"
              >
                <span className="text-yellow-400">{defaults || 0}</span>
              </div>
              <span className="text-gray-500">|</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSync}
              className={`text-xs flex items-center gap-1 hover:bg-gray-700/50 px-2 py-1 rounded transition-colors w-20 justify-center ${"hover:scale-105"}`}
            >
              <RefreshCw
                className={`w-3 h-3 ${getLastSyncColor(lastSyncedAt)} ${
                  syncUploads.isPending ? "animate-spin" : ""
                }`}
              />
              <span className={`${getLastSyncColor(lastSyncedAt)} font-medium`}>
                {formatLastSync(lastSyncedAt)}
              </span>
            </button>

            {onDownload && (
              <button
                onClick={handleDownloadClick}
                className="btn btn-ghost btn-sm btn-circle hover:bg-gray-700/50 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4 text-blue-400" />
              </button>
            )}

            {onDelete && (
              <button
                onClick={handleDeleteClick}
                className="btn btn-ghost btn-sm btn-circle hover:bg-gray-700/50 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            )}
          </div>

          <div className="relative flex-shrink-0" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className={`btn btn-ghost btn-sm btn-circle transition-colors ${"hover:bg-gray-700"}`}
            >
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-8 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-2 min-w-[200px] z-50">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(id.toString());
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded transition-colors"
                  >
                    <CopyValue type="id" value={id.toString()} />
                    <span>Copy ID</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(ytId);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded transition-colors"
                  >
                    <CopyValue type="youtube" value={ytId} />
                    <span>Copy YouTube ID</span>
                  </button>
                  <button
                    onClick={handleOpenExplorerClick}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded transition-colors"
                  >
                    <FolderOpen className="w-4 h-4 text-gray-400" />
                    <span>Open Directory</span>
                  </button>

                  <div className="border-t border-gray-700 my-1"></div>

                  <button
                    onClick={handleAddToIgnoreList}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded transition-colors ${
                      isIgnored(ytId)
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-gray-200 hover:bg-gray-700"
                    }`}
                    disabled={isIgnored(ytId)}
                  >
                    <span
                      className={`w-4 h-4 flex items-center justify-center ${
                        isIgnored(ytId) ? "text-gray-500" : "text-red-400"
                      }`}
                    >
                      {isIgnored(ytId) ? "✓" : "×"}
                    </span>
                    <span>
                      {isIgnored(ytId)
                        ? "Already ignored"
                        : "Add to ignore list"}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
