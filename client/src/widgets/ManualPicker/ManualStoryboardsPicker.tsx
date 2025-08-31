import { setProcessingData, useStoryboardsProcessingState } from "@shared/store";
import type { UploadWithStoryboardResponse } from "@shared/api/generated/graphql";
import { Grid } from "@widgets/Grid";
import { useDeleteUploads, useSaveUpload } from "@features/Upload";

export function ManualStoryboardsPicker() {
  const { items } = useStoryboardsProcessingState();
  const typesItems = items as UploadWithStoryboardResponse[];

  const handleSideEffect = () => {
    setProcessingData("storyboards", typesItems.slice(1));
  };

  const save = useSaveUpload(() => {
    handleSideEffect();
  });

  const deleteUploadFromDbMutation = useDeleteUploads(handleSideEffect);

  const upload = typesItems[0];

  if (!upload) return null;

  const handleSave = () => {
    if (!upload) return;
    save({
      uploads: [
        {
          ytVideoId: upload.ytId,
          ytChannelId: upload.channel.ytId,
        },
      ],
    }).then(handleSideEffect);
  };

  const handleDelete = (ytVideoIds: string[]) => {
    deleteUploadFromDbMutation({
      ytChannelId: upload.channel.ytId,
      ytVideoIds,
    }).then(handleSideEffect);
  };

  const storyboardFragments = upload.storyboard.fragments;
  const storyboardBaseUrl = upload.storyboard.url;
  const storyboardItems = Array.from({ length: storyboardFragments }).map(
    (_, index) => ({
      index,
      url: storyboardBaseUrl.replace("M$M", `M${index}`),
    })
  );

  return (
    <div>
      <div className="p-4 border-b border-base-300">
        <h2 className="text-xl font-semibold">
          {upload.title || "Storyboard"}
        </h2>
        <p className="text-sm text-base-content/70">
          {storyboardFragments} fragment
          {storyboardFragments !== 1 ? "s" : ""}
        </p>
      </div>
      <Grid>
        {storyboardItems.map(({ index, url }) => (
          <div
            key={index}
            className="bg-base-200 rounded shadow-sm p-2 flex flex-col items-center"
          >
            <img
              src={url}
              alt={`Storyboard M${index}`}
              className="w-full h-auto object-contain"
            />
            <div className="mt-2 text-xs text-base-content/70">M{index}</div>
          </div>
        ))}
      </Grid>

      <div className="p-4 border-t border-base-300 flex justify-end gap-2">
        <button
          onClick={() => handleDelete([upload.ytId])}
          type="button"
          className="btn btn-error"
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>
    </div>
  );
}
