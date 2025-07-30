import useDeleteChannel from "@/features/Channel/hooks/useDeleteChannel";

export default function DeleteChannel({
  id,
  onSuccess,
}: {
  id: number;
  onSuccess: () => void;
}) {
  const { mutateAsync } = useDeleteChannel();

  return (
    <button
      className="btn btn-soft btn-error btn-sm"
      onClick={() =>
        mutateAsync(id, {
          onSuccess,
        })
      }
    >
      Delete
    </button>
  );
}
