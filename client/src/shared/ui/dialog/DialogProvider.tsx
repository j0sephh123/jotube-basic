import { ReactNode } from "react";
import ConfirmDialog from "./ConfirmDialog";
import InputDialog from "./InputDialog";
import { DialogContext, useDialogState } from "@/shared/hooks/useDialog";

type DialogProviderProps = {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DialogRenderer = ({ dialogState }: { dialogState: any }) => {
  if (dialogState.dialog.type === "input") {
    return (
      <InputDialog
        isOpen={dialogState.dialog.isOpen}
        onClose={dialogState.closeDialog}
        title={dialogState.dialog.title}
        message={dialogState.dialog.message}
        placeholder={dialogState.dialog.placeholder}
        defaultValue={dialogState.dialog.defaultValue}
        saveText={dialogState.dialog.saveText}
        cancelText={dialogState.dialog.cancelText}
        variant={dialogState.dialog.variant}
        onSave={dialogState.dialog.onSave!}
        onCancel={dialogState.dialog.onCancel}
        errorMessage={dialogState.dialog.errorMessage}
        isLoading={dialogState.dialog.isLoading}
      >
        {dialogState.dialog.children}
      </InputDialog>
    );
  }

  return (
    <ConfirmDialog
      isOpen={dialogState.dialog.isOpen}
      onClose={dialogState.closeDialog}
      title={dialogState.dialog.title}
      message={dialogState.dialog.message}
      confirmText={dialogState.dialog.confirmText}
      cancelText={dialogState.dialog.cancelText}
      variant={dialogState.dialog.variant}
      onConfirm={dialogState.dialog.onConfirm}
      onCancel={dialogState.dialog.onCancel}
    >
      {dialogState.dialog.children}
    </ConfirmDialog>
  );
};

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const dialogState = useDialogState();

  return (
    <DialogContext.Provider value={dialogState}>
      {children}
      <DialogRenderer dialogState={dialogState} />
    </DialogContext.Provider>
  );
};
