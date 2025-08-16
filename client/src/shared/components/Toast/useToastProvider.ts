import { useState, useCallback } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type ToastOptions = {
  duration?: number;
  type?: ToastType;
};

type ToastI = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  message: string | JSX.Element;
  options: ToastOptions;
};

export function useToastProvider() {
  const [toasts, setToasts] = useState<Array<ToastI>>([]);

  const show = useCallback(
    (message: string | JSX.Element, options: ToastOptions = {}) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, options }]);
      return id;
    },
    []
  );

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return {
    toasts,
    show,
    remove,
  };
}
