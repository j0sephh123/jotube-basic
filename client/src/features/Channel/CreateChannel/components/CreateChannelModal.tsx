import Modal from "@/shared/components/Modal";
import CreateChannelForm from "./CreateChannelForm";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: ({ ytVideoId }: { ytVideoId: string }) => void;
};

export default function CreateChannelModal({
  isVisible,
  onClose,
  onSubmit,
}: Props): JSX.Element {
  if (!isVisible) return null;

  return (
    <Modal
      onClose={onClose}
      isModalVisible={isVisible}
      maxHeight="50vh"
      maxWidth="50vw"
      style={{
        display: "flex",
      }}
    >
      <CreateChannelForm onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
}
