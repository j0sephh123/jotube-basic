import { timeAgo } from "@shared/utils";
import { TrashIcon, MoreVertical } from "lucide-react";
import { useImageSrc } from "@shared/lib";
import { useMemo } from "react";
import { CopyValue } from "@shared/ui";
import { OpenDirectoryButton } from "@shared/ui";
import { useVideoPlayer } from "@features/Upload";

type VideoCardProps = {
  item: {
    id: number;
    ytId: string;
    title: string;
    publishedAt: string;
    duration?: number | null;
    src: string;
    artifact?: string;
  };
  onSave: (ytVideoId: string) => void;
  onDelete?: (ytVideoId: string) => void;
  onRemoveFromWaitingToProcess?: (uploadId: number) => void;
  actionButtonText: string;
  ytChannelId: string;
};

export const Card = ({
  item,
  onSave,
  onDelete,
  actionButtonText,
  ytChannelId,
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
      getEmbedUrl,
      imageSrc,
      handleImageError,
      handleVideoClick,
    ]
  );

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden group">
      {img}
      <div className="card-body p-3">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-sm font-semibold truncate flex-1 min-w-0">
            {item.title}
          </h2>
          <div className="flex items-center gap-2 ml-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {timeAgo(item.publishedAt)}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">12:34</span>
            </div>
            <div className="dropdown dropdown-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
                <MoreVertical className="w-4 h-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <OpenDirectoryButton
                    ytChannelId={ytChannelId}
                    ytVideoId={item.ytId}
                  />
                </li>
                <li>
                  <CopyValue type="youtube" value={item.ytId} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            className="btn btn-soft btn-primary btn-sm flex-1"
            onClick={() => onSave(item.ytId)}
          >
            {actionButtonText}
          </button>

          {onDelete && (
            <button
              className="btn btn-neutral btn-sm"
              onClick={() => onDelete(item.ytId)}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
