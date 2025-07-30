import { useState, useCallback, createContext, useContext } from "react";

type DialogConfig = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "info" | "success" | "warning" | "error";
  children?: React.ReactNode;
}

type ConfirmOptions = DialogConfig & {
  onYes: () => void;
  onNo?: () => void;
}

type InputOptions = DialogConfig & {
  placeholder?: string;
  defaultValue?: string;
  saveText?: string;
  onSave: (value: string) => void;
  onCancel?: () => void;
  errorMessage?: string;
  isLoading?: boolean;
}

type DialogState = DialogConfig & {
  isOpen: boolean;
  type: "confirm" | "input";
  placeholder?: string;
  defaultValue?: string;
  saveText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onSave?: (value: string) => void;
  errorMessage?: string;
  isLoading?: boolean;
}

type DialogContextType = {
  dialog: DialogState;
  confirm: (options: ConfirmOptions) => void;
  input: (options: InputOptions) => void;
  closeDialog: () => void;
  setDialogError: (errorMessage: string) => void;
  setDialogLoading: (isLoading: boolean) => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

export const useDialogState = () => {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: "confirm",
    title: "Confirm",
    message: "Are you sure?",
    confirmText: "Yes",
    cancelText: "No",
    variant: "info",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const confirm = useCallback((options: ConfirmOptions) => {
    const {
      title = "Confirm",
      message = "Are you sure?",
      confirmText = "Yes",
      cancelText = "No",
      variant = "info",
      children,
      onYes,
      onNo = () => {},
    } = options;

    setDialogState({
      isOpen: true,
      type: "confirm",
      title,
      message,
      confirmText,
      cancelText,
      variant,
      children,
      onConfirm: onYes,
      onCancel: onNo,
    });
  }, []);

  const input = useCallback((options: InputOptions) => {
    const {
      title = "Enter Text",
      message = "Please enter some text:",
      placeholder = "Enter text here...",
      defaultValue = "",
      saveText = "Save",
      cancelText = "Cancel",
      variant = "info",
      children,
      onSave,
      onCancel = () => {},
      errorMessage = "",
      isLoading = false,
    } = options;

    setDialogState({
      isOpen: true,
      type: "input",
      title,
      message,
      placeholder,
      defaultValue,
      saveText,
      cancelText,
      variant,
      children,
      onConfirm: () => {},
      onCancel,
      onSave,
      errorMessage,
      isLoading,
    });
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const setDialogError = useCallback((errorMessage: string) => {
    setDialogState((prev) => ({ ...prev, errorMessage }));
  }, []);

  const setDialogLoading = useCallback((isLoading: boolean) => {
    setDialogState((prev) => ({ ...prev, isLoading }));
  }, []);

  return {
    dialog: dialogState,
    confirm,
    input,
    closeDialog,
    setDialogError,
    setDialogLoading,
  };
};

export { DialogContext };
