import Modal from "@/shared/ui/Modal";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CreateChannelModal({
  isVisible,
  onClose,
  children,
}: Props): JSX.Element {
  if (!isVisible) return <></>;

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
      {children}
    </Modal>
  );
}
