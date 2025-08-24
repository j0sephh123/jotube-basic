import { useVideoPlayer } from "@features/Upload";
import { formatSecondsToMMSS } from "@shared/utils";
import { Avatar } from "@shared/ui";

export function VideoPlayer({
  ytId,
  src,
  id,
  title,
  duration,
}: {
  ytId: string;
  src: string;
  id: number;
  title: string;
  duration?: number | null;
}) {
  const { playingVideos, handleVideoClick, getEmbedUrl } = useVideoPlayer();

  return (
    <>
      {playingVideos[ytId] ? (
        <div className="w-full aspect-video">
          <iframe
            src={getEmbedUrl(ytId)}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <figure
          className="relative cursor-pointer aspect-video"
          onClick={() => handleVideoClick(ytId)}
        >
          <Avatar
            ytId={ytId}
            id={id}
            src={src}
            className="w-full h-full object-cover"
          />
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
              {formatSecondsToMMSS(duration)}
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
      )}
    </>
  );
}
