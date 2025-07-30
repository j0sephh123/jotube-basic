import Modal from "@/shared/components/Modal";

type Props = {
  isVisible: boolean;
  imageUrl: string | null;
  onClose: () => void;
};

export default function ZoomModal({ isVisible, imageUrl, onClose }: Props) {
  if (!imageUrl) return null;

  return (
    <Modal
      isModalVisible={isVisible}
      onClose={onClose}
      maxWidth="90vw"
      maxHeight="90vh"
    >
      <h2 className="text-xl font-bold mb-4">Zoomed Image</h2>
      <img
        src={imageUrl}
        alt="Zoomed screenshot"
        className="w-full h-full object-contain"
        onClick={onClose}
      />
    </Modal>
  );
}
