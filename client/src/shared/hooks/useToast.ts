import { useToastContext } from "@app/providers/toast";

export const useToast = () => {
  return useToastContext();
};
