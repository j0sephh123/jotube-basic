import { useEffect } from "react";
import { createPortal } from "react-dom";

type ToastProps = {
  message: string | JSX.Element;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose: () => void;
};

export default function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastClass = {
    success: "alert alert-success",
    error: "alert alert-error",
    info: "alert alert-info",
    warning: "alert alert-warning",
  }[type];

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999]">
      <div className={toastClass}>
        <div>{message}</div>
      </div>
    </div>,
    document.body
  );
}
