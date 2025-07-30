import { ReactNode, useState, useEffect } from "react";
import Modal from "@/shared/components/Modal";

type InputDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  placeholder?: string;
  defaultValue?: string;
  saveText?: string;
  cancelText?: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  variant?: "info" | "success" | "warning" | "error";
  children?: ReactNode;
  errorMessage?: string;
  isLoading?: boolean;
}

const InputDialog = ({
  isOpen,
  onClose,
  title = "Enter Text",
  message = "Please enter some text:",
  placeholder = "Enter text here...",
  defaultValue = "",
  saveText = "Save",
  cancelText = "Cancel",
  onSave,
  onCancel,
  variant = "info",
  children,
  errorMessage,
  isLoading = false,
}: InputDialogProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) {
      setInputValue(defaultValue);
    }
  }, [isOpen, defaultValue]);

  const handleSave = () => {
    if (!isLoading) {
      onSave(inputValue);
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      onCancel();
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSave();
    }
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
      onClose={isLoading ? () => {} : onClose}
      maxWidth="500px"
      maxHeight="400px"
    >
      <div className="p-6">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <div className="py-4">
          {children || <p className="mb-4">{message}</p>}
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input input-bordered w-full"
            autoFocus
            disabled={isLoading}
          />
          {errorMessage && (
            <div className="alert alert-error mt-4">
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="btn btn-outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            className={`btn ${getVariantClasses()}`}
            onClick={handleSave}
            disabled={!inputValue.trim() || isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              saveText
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InputDialog;
