import { TrashIcon, MoreVertical } from "lucide-react";
import { timeAgo } from "@shared/utils/date";
import { useVideoPlayer } from "@features/Upload/hooks/useVideoPlayer";
import useImageSrc from "@shared/hooks/useImageSrc";
import { useMemo } from "react";
import OpenExplorerButton from "@shared/ui/OpenDirectoryButton/OpenDirectoryButton";
import { formatSecondsToMMSS } from "@shared/utils/format";
import Tooltip from "@shared/ui/Tooltip";

type VideoCardProps = {
  item: {
    id: number;
    ytId: string;
    title: string;
    publishedAt: string;
    duration?: number | null;
    src: string;
    artifact?: string;
    Storyboard?: {
      fragments: number;
      url: string;
    } | null;
  };
  onSave: (ytVideoIds: string[]) => void;
  onDelete: (ytVideoIds: string[]) => void;
  onCreateStoryboard: (ytVideoId: string) => void;
  ytChannelId: string;
};

export const DefaultUploadCard = ({
  item,
  onSave,
  onDelete,
  ytChannelId,
  onCreateStoryboard,
}: VideoCardProps) => {
  const { playingVideos, handleVideoClick, getEmbedUrl } = useVideoPlayer();

  const { imageSrc, handleImageError } = useImageSrc(
    item.src,
    item.ytId,
    item.id
  );

  const img = useMemo(
    () =>
      playingVideos[item.ytId] ? (
        <div className="w-full aspect-video">
          <iframe
            src={getEmbedUrl(item.ytId)}
            title={item.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <figure
          className="relative cursor-pointer aspect-video"
          onClick={() => handleVideoClick(item.ytId)}
        >
          <img
            src={imageSrc}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          {item.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
              {formatSecondsToMMSS(item.duration)}
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-8 h-8"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </figure>
      ),
    [
      playingVideos,
      item.ytId,
      item.title,
      item.duration,
      getEmbedUrl,
      imageSrc,
      handleImageError,
      handleVideoClick,
    ]
  );

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="overflow-hidden">{img}</div>
      <div className="card-body p-3">
        <div className="flex justify-between items-start mb-2">
          <Tooltip
            content={item.ytId}
            position="top"
            className="flex-1 min-w-0"
          >
            <h2 className="text-sm font-semibold truncate">{item.title}</h2>
          </Tooltip>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-base-content/70 truncate min-w-0">
              {timeAgo(item.publishedAt)}
            </span>
            <span className="text-xs text-base-content/50">•</span>
            <span className="text-xs text-base-content/70">12:34</span>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <div className="dropdown dropdown-end flex-shrink-0">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
                <MoreVertical className="w-4 h-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[9999] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <OpenExplorerButton
                    ytChannelId={ytChannelId}
                    ytVideoId={item.ytId}
                  />
                </li>
                <li>
                  <button
                    className="btn btn-ghost w-full justify-start"
                    onClick={() => navigator.clipboard.writeText(item.ytId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-red-500"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="ml-2">Copy YouTube ID</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            className="btn btn-soft btn-success btn-md flex-1"
            onClick={() => {
              onSave([item.ytId]);
            }}
          >
            Save
          </button>
          <button
            className="btn btn-soft btn-warning btn-md flex-1"
            onClick={() => onCreateStoryboard(item.ytId)}
          >
            Storyboard
          </button>
          <button
            className="btn btn-soft btn-error btn-md flex-1"
            onClick={() => onDelete([item.ytId])}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultUploadCard;
