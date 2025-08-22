import { useToastContext } from "../model/useToastContext";
import Toast from "./Toast";

export default function ToastContainer() {
  const { toasts, remove } = useToastContext();

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
}
