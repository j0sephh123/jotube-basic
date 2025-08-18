import Modal from "@shared/ui/Modal";

type ScreenshotZoomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export const ScreenshotZoomModal = ({
  isVisible,
  onClose,
  imageUrl,
  title,
}: ScreenshotZoomModalProps) => {
  if (!isVisible) return null;

  return (
    <Modal
      isModalVisible={isVisible}
      onClose={onClose}
      maxWidth="90vw"
      maxHeight="90vh"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain"
          onClick={onClose}
        />
      </div>
    </Modal>
  );
};
