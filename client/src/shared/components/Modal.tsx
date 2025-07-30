import { useEffect, useRef, ReactNode } from "react";

type ModalProps = {
  isModalVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  maxHeight?: string;
  style?: React.CSSProperties;
}

const Modal = ({
  isModalVisible,
  onClose,
  children,
  maxWidth,
  maxHeight,
  style,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isModalVisible && !dialog.open) {
        dialog.showModal();
      } else if (!isModalVisible && dialog.open) {
        dialog.close();
      }
    }
  }, [isModalVisible]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const modalBox = e.currentTarget.querySelector(".modal-box");
    if (!modalBox) return;

    const rect = modalBox.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.bottom &&
      rect.left <= e.clientX &&
      e.clientX <= rect.right;

    if (!isInDialog) {
      onClose();
    }
  };

  if (!isModalVisible) return null;

  return (
    <dialog
      ref={dialogRef}
      className="modal w-full"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div
        className="modal-box relative w-full p-0"
        style={{
          maxWidth: maxWidth || "none",
          maxHeight: maxHeight || "none",
          ...style,
        }}
      >
        <form method="dialog">
          <button
            type="button"
            className="btn btn-lg btn-circle btn-ghost absolute right-4 top-4 z-50"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
