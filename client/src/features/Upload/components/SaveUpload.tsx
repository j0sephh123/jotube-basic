import { useSaveUpload } from "@features/Upload";

export function SaveUpload({
  ytVideoId,
  handleSideEffect,
}: {
  ytVideoId: string;
  handleSideEffect: () => void;
}) {
  const save = useSaveUpload(handleSideEffect);

  return (
    <button
      className="btn btn-soft btn-success btn-md flex-1"
      onClick={() => {
        save({ uploads: [ytVideoId] });
      }}
    >
      Save
    </button>
  );
}
