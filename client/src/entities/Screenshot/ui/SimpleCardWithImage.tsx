import { Trash2 } from "lucide-react";
import { useState } from "react";

// Local type definitions to avoid external dependencies
type ScreenshotCardProps = {
  id: number;
  second: number;
  channelTitle: string;
  videoTitle: string;
  isFav: boolean;
  ytChannelId: string;
  ytVideoId: string;
  onDelete: (id: number) => void;
  onUpdateScreenshot: (id: number, isFav: boolean) => void;
  imageUrl: string;
};

// Local component implementations to avoid shared dependencies
const LocalChannelLink = ({
  ytId,
  children,
  className,
}: {
  ytId: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a href={`/channels/${ytId}`} className={className}>
    {children}
  </a>
);

const LocalConfirmDialog = ({
  isOpen,
  _onClose,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  _onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={onConfirm}>
            Delete
          </button>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const LocalVideoModal = ({
  isVisible,
  onClose,
  _videoId,
  embedUrl,
  _startTime,
}: {
  isVisible: boolean;
  onClose: () => void;
  _videoId: string;
  embedUrl: string;
  _startTime: number;
}) => {
  if (!isVisible) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg mb-4">Video Player</h3>
        <iframe
          width="100%"
          height="400"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const LocalScreenshotZoomModal = ({
  isVisible,
  onClose,
  imageUrl,
  title,
}: {
  isVisible: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}) => {
  if (!isVisible) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <img src={imageUrl} alt={title} className="w-full h-auto" />
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Local hook implementation to avoid shared dependencies
const useLocalVideoModal = () => {
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  const openVideoModal = () => setIsVideoModalVisible(true);
  const closeVideoModal = () => setIsVideoModalVisible(false);

  const getEmbedUrl = (videoId: string, startTime: number) =>
    `https://www.youtube.com/embed/${videoId}?start=${startTime}`;

  return {
    isVideoModalVisible,
    openVideoModal,
    closeVideoModal,
    getEmbedUrl,
  };
};

export default function SimpleCardWithImage({
  id,
  second,
  channelTitle,
  videoTitle,
  ytChannelId,
  ytVideoId,
  onDelete,
  onUpdateScreenshot,
  imageUrl,
}: ScreenshotCardProps) {
  const [isZoomModalVisible, setIsZoomModalVisible] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { isVideoModalVisible, openVideoModal, closeVideoModal, getEmbedUrl } =
    useLocalVideoModal();

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setIsDeleteDialogOpen(false);
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
            <LocalChannelLink
              ytId={ytChannelId}
              className="text-base hover:text-primary hover:underline"
            >
              {channelTitle}
            </LocalChannelLink>
          </div>
          <div className="flex justify-end gap-1 mt-2">
            <button
              onClick={handleDeleteClick}
              className="btn btn-ghost btn-sm"
            >
              <Trash2 className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <LocalScreenshotZoomModal
        isVisible={isZoomModalVisible}
        onClose={() => setIsZoomModalVisible(false)}
        imageUrl={imageUrl}
        title={`${videoTitle} - ${second}s`}
      />

      <LocalConfirmDialog
        isOpen={isDeleteDialogOpen}
        _onClose={handleCancelDelete}
        title="Delete Screenshot"
        message={`Are you sure you want to delete this screenshot from "${videoTitle}" at second ${second}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <LocalVideoModal
        isVisible={isVideoModalVisible}
        onClose={closeVideoModal}
        _videoId={ytVideoId}
        embedUrl={getEmbedUrl(ytVideoId, second)}
        _startTime={second}
      />
    </>
  );
}
