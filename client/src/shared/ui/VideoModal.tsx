/* eslint-disable boundaries/element-types */
/* eslint-disable import/no-internal-modules */
import { createPortal } from "react-dom";
import { formatSecondsToTime } from "@shared/utils";
import {
  useVideoModalState,
  closeVideoModal,
} from "@features/Upload/model/videoModalStore";

export default function VideoModal() {
  const { isVideoModalVisible, embedUrl, startTime } = useVideoModalState();

  if (!isVideoModalVisible) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: 9999999 }}
      onClick={closeVideoModal}
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
          <button className="btn btn-ghost" onClick={closeVideoModal}>
            Close
          </button>
        </div>
        <button
          className="btn btn-ghost absolute top-4 right-4"
          onClick={closeVideoModal}
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}
