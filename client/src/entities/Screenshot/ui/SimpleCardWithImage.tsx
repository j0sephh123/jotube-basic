import { useUpdateScreenshot } from "@/features/Screenshot/hooks/useUpdateScreenshot";
import { Heart, Trash2 } from "lucide-react";
import { getPublicImgUrl } from "@/shared/utils/image";
import { ScreenshotZoomModal } from "../../../features/Screenshot/components/ScreenshotZoomModal";
import { useState } from "react";
import { useVideoModal } from "@/shared/hooks/useVideoModal";
import VideoModal from "@/shared/ui/VideoModal";
import ChannelLink from "@/shared/ui/ChannelLink";
import ConfirmDialog from "@/shared/ui/dialog/ConfirmDialog";

type ScreenshotCardProps = {
  id: number;
  second: number;
  channelTitle: string;
  videoTitle: string;
  isFav: boolean;
  ytChannelId: string;
  ytVideoId: string;
  onDelete: (id: number) => void;
};

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
  const { isVideoModalVisible, openVideoModal, closeVideoModal, getEmbedUrl } =
    useVideoModal();

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
              onClick={openVideoModal}
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

      <VideoModal
        isVisible={isVideoModalVisible}
        onClose={closeVideoModal}
        videoId={ytVideoId}
        embedUrl={getEmbedUrl(ytVideoId, second)}
        startTime={second}
      />
    </>
  );
}
