import { ToastViewport, Toast, ToastTitle } from "@radix-ui/react-toast";
import { closeMessage, useMessageState } from "./notificationStore";

export default function Notification() {
  const { message } = useMessageState();

  return (
    <>
      <Toast
        open={!!message}
        onOpenChange={(open) => {
          if (!open) {
            closeMessage();
          }
        }}
        duration={3000}
        className="card shadow-xl bg-base-100 border border-base-300 p-4 w-96 max-w-[100vw]"
      >
        <ToastTitle className="font-semibold">{message}</ToastTitle>
      </Toast>
      <ToastViewport className="fixed bottom-4 right-4 z-[2147483647] flex flex-col gap-2 w-96 max-w-[100vw]" />
    </>
  );
}
