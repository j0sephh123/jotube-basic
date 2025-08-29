import { closeZoom, useZoom } from "@features/Screenshot";
import { Modal } from "@shared/ui";

export default function ZoomModal() {
  const { url } = useZoom();

  if (!url) return null;

  return (
    <Modal
      isModalVisible={!!url}
      onClose={closeZoom}
      maxWidth="90vw"
      maxHeight="90vh"
    >
      <h2 className="text-xl font-bold mb-4">Zoomed Image</h2>
      <img
        src={url}
        alt="Zoomed screenshot"
        className="w-full h-full object-contain"
        onClick={closeZoom}
      />
    </Modal>
  );
}
