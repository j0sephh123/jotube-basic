import { ReactNode } from "react";
import Modal from "@/shared/components/Modal";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "info" | "success" | "warning" | "error";
  children?: ReactNode;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
  variant = "info",
  children,
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "btn-success";
      case "warning":
        return "btn-warning";
      case "error":
        return "btn-error";
      default:
        return "btn-primary";
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isModalVisible={isOpen}
      onClose={onClose}
      maxWidth="500px"
      maxHeight="300px"
    >
      <div className="p-6">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <div className="py-4">{children || <p>{message}</p>}</div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="btn btn-outline" onClick={handleCancel}>
            {cancelText}
          </button>
          <button
            className={`btn ${getVariantClasses()}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
