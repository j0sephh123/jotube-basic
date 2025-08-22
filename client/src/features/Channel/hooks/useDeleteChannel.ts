import { useDeleteChannelMutation } from "@shared/api";

export default function useDeleteChannel() {
  const [deleteChannelMutation] = useDeleteChannelMutation();

  return {
    mutateAsync: (id: number, options?: { onSuccess?: () => void }) => {
      return deleteChannelMutation({
        variables: { id },
        onCompleted: options?.onSuccess,
      });
    },
  };
}
