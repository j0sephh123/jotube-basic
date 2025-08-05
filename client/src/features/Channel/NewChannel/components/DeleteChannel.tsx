import useDeleteChannel from "@/features/Channel/hooks/useDeleteChannel";
import { useRefetchNoUploadsView } from "@/features/Dashboard/views/SavedAndProcessedView/useDashboardQuery";

export default function DeleteChannel({ id }: { id: number }) {
  const { mutateAsync } = useDeleteChannel();
  const refetchNoUploadsView = useRefetchNoUploadsView();

  return (
    <button
      className="btn btn-soft btn-error btn-sm"
      onClick={() =>
        mutateAsync(id, {
          onSuccess: () => {
            refetchNoUploadsView();
          },
        })
      }
    >
      Delete
    </button>
  );
}
