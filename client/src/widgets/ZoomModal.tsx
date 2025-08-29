import { useZoom } from "@features/Screenshot";
import { Modal } from "@shared/ui";

export default function ZoomModal() {
  const { isVisible, url, onClose } = useZoom();

  if (!isVisible || !url) return null;

  return (
    <Modal
      isModalVisible={isVisible}
      onClose={onClose}
      maxWidth="90vw"
      maxHeight="90vh"
    >
      <h2 className="text-xl font-bold mb-4">Zoomed Image</h2>
      <img
        src={url}
        alt="Zoomed screenshot"
        className="w-full h-full object-contain"
        onClick={onClose}
      />
    </Modal>
  );
}
