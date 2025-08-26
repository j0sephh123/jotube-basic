import { createPortal } from "react-dom";
import { formatSecondsToTime } from "@shared/utils";

type VideoModalProps = {
  isVisible: boolean;
  onClose: () => void;
  videoId: string;
  embedUrl: string;
  startTime?: number;
};

export default function VideoModal({
  isVisible,
  onClose,
  embedUrl,
  startTime,
}: VideoModalProps) {
  if (!isVisible) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: 9999999 }}
      onClick={onClose}
    >
      <div
        className="bg-base-100 p-6 rounded-lg w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-video mb-4">
          <iframe
            src={embedUrl}
            title="YouTube video player"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {startTime !== undefined && (
          <div className="text-center mb-4">
            <span className="text-lg font-mono bg-gray-800 px-3 py-1 rounded">
              {formatSecondsToTime(startTime)}
            </span>
          </div>
        )}
        <div className="flex justify-center">
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
        <button
          className="btn btn-ghost absolute top-4 right-4"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}
