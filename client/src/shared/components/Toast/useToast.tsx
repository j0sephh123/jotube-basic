import { useState, useCallback } from "react";
import Toast from "./Toast";

type ToastType = "success" | "error" | "info" | "warning";

type ToastOptions = {
  duration?: number;
  type?: ToastType;
};

export function useToast() {
  const [toasts, setToasts] = useState<
    Array<{ id: number; message: string | JSX.Element; options: ToastOptions }>
  >([]);

  const show = useCallback(
    (message: string | JSX.Element, options: ToastOptions = {}) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, options }]);
      return id;
    },
    []
  );

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const ToastContainer = useCallback(() => {
    return (
      <>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.options.type}
            duration={toast.options.duration}
            onClose={() => remove(toast.id)}
          />
        ))}
      </>
    );
  }, [toasts, remove]);

  return {
    show,
    remove,
    ToastContainer,
  };
}
