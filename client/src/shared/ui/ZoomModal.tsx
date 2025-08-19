import Modal from "@shared/ui/Modal";
import { useZoom } from "@/app/providers/store/store";

export default function ZoomModal() {
  const { closeZoom, url, isVisible } = useZoom();

  // const handleClose = () => {
  //   onClose();
  //   setZoomImage(null);
  // };

  if (!isVisible || !url) return null;

  return (
    <Modal
      isModalVisible={isVisible}
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
