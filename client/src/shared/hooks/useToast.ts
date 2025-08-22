// Local hook implementation to avoid cross-layer dependencies
const useLocalToastContext = () => {
  return {
    toast: (_message: string, _type?: "success" | "error" | "warning" | "info") => {},
    success: (_message: string) => {},
    error: (_message: string) => {},
    warning: (_message: string) => {},
    info: (_message: string) => {},
  };
};

export const useToast = () => {
  return useLocalToastContext();
};
