import { useUpdateScreenshot } from "@/features/Screenshot/hooks/useUpdateScreenshot";
import { Heart, Trash2 } from "lucide-react";
import { getPublicImgUrl } from "@/shared/utils/image";
import { ScreenshotZoomModal } from "./ScreenshotZoomModal";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ChannelLink from "../../../shared/components/ChannelLink";
import ConfirmDialog from "@/shared/components/dialog/ConfirmDialog";

type ScreenshotCardProps = {
  id: number;
  second: number;
  channelTitle: string;
  videoTitle: string;
  isFav: boolean;
  ytChannelId: string;
  ytVideoId: string;
  onDelete: (id: number) => void;
}

export default function SimpleCardWithImage({
  id,
  second,
  channelTitle,
  videoTitle,
  isFav,
  ytChannelId,
  ytVideoId,
  onDelete,
}: ScreenshotCardProps) {
  const { mutate: updateScreenshot } = useUpdateScreenshot();
  const [isZoomModalVisible, setIsZoomModalVisible] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  const imageUrl = getPublicImgUrl(
    ytChannelId,
    ytVideoId,
    second,
    "saved_screenshots"
  );

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVideoModalVisible) {
        setIsVideoModalVisible(false);
      }
    };

    if (isVideoModalVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVideoModalVisible]);

  const getEmbedUrl = (videoId: string, startTime: number) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&start=${
      startTime - 1
    }&showinfo=1&modestbranding=1`;
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={imageUrl}
            alt={`Screenshot from ${videoTitle}`}
            className="w-full h-48 object-cover cursor-pointer"
            onClick={() => setIsZoomModalVisible(true)}
          />
        </figure>
        <div className="card-body p-3">
          <div className="flex justify-between items-center">
            <div
              className="text-base text-gray-600 cursor-pointer hover:text-gray-400"
              onClick={() => setIsVideoModalVisible(true)}
            >
              {second}
            </div>
            <ChannelLink
              ytId={ytChannelId}
              where="index"
              className="text-base hover:text-primary hover:underline"
            >
              {channelTitle}
            </ChannelLink>
          </div>
          <div className="flex justify-end gap-1 mt-2">
            <button
              onClick={() => updateScreenshot({ id, isFav: !isFav })}
              className="btn btn-ghost btn-sm"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFav ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
              />
            </button>
            <button
              onClick={handleDeleteClick}
              className="btn btn-ghost btn-sm"
            >
              <Trash2 className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <ScreenshotZoomModal
        isVisible={isZoomModalVisible}
        onClose={() => setIsZoomModalVisible(false)}
        imageUrl={imageUrl}
        title={`${videoTitle} - ${second}s`}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        title="Delete Screenshot"
        message={`Are you sure you want to delete this screenshot from "${videoTitle}" at second ${second}?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        variant="error"
      />

      {isVideoModalVisible &&
        ytVideoId &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            style={{ zIndex: 99999 }}
            onClick={() => setIsVideoModalVisible(false)}
          >
            <div
              className="bg-base-100 p-6 rounded-lg w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-video mb-4">
                <iframe
                  src={getEmbedUrl(ytVideoId, second)}
                  title="YouTube video player"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="text-center mb-4">
                <span className="text-lg font-mono bg-gray-800 px-3 py-1 rounded">
                  {second}s
                </span>
              </div>
              <div className="flex justify-center">
                <button
                  className="btn btn-ghost"
                  onClick={() => setIsVideoModalVisible(false)}
                >
                  Close
                </button>
              </div>
              <button
                className="btn btn-ghost absolute top-4 right-4"
                onClick={() => setIsVideoModalVisible(false)}
              >
                ✕
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
