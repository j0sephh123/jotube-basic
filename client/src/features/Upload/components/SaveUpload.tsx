import { useSaveUpload } from "@features/Upload";

export function SaveUpload({
  ytVideoId,
  ytChannelId,
  handleSideEffect,
}: {
  ytVideoId: string;
  ytChannelId: string;
  handleSideEffect: () => void;
}) {
  const save = useSaveUpload(handleSideEffect);
  const handleSave = (ytVideoIds: string[]) => {
    save({
      uploads: ytVideoIds.map((ytVideoId) => ({ ytVideoId, ytChannelId })),
    });
  };

  return (
    <button
      className="btn btn-soft btn-success btn-md flex-1"
      onClick={() => {
        handleSave([ytVideoId]);
      }}
    >
      Save
    </button>
  );
}
