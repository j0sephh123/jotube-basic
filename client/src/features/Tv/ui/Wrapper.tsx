import { closeTvModal, useTvModalState } from "@features/Tv";
import { Modal } from "@shared/ui";
import { type PropsWithChildren } from "react";

export default function Wrapper({ children }: PropsWithChildren) {
  const { type } = useTvModalState();

  return (
    <Modal
      isModalVisible={type !== null}
      onClose={closeTvModal}
      maxWidth="90vw"
      maxHeight="90vh"
    >
      <div className="p-4 w-[90vw] h-[90vh]">{children}</div>
    </Modal>
  );
}
