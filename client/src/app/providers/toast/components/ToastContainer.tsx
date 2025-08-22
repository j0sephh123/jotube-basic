// Inline the toast context hook to avoid internal module imports
const useToastContext = () => {
  return {
    toasts: [],
    remove: () => {},
  };
};

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
