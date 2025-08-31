

export function ManualStoryboardsPicker() {

  // const save = useSaveUpload(() => {
  //   refetchChannelMetadata();
  // });

  // const handleSave = () => {
  //   if (!activeStoryboard) return;
  //   save({
  //     uploads: [{ ytVideoId: activeStoryboard.ytId, ytChannelId }],
  //   }).then(handleSideEffect);
  // };

  // const deleteUploadFromDbMutation = useDeleteUploads(handleSideEffect);

  // const handleDelete = (ytVideoIds: string[]) => {
  //   deleteUploadFromDbMutation({
  //     ytChannelId,
  //     ytVideoIds,
  //   }).then(handleSideEffect);
  // };

  const title = ''
  const fragments = 1;
  const storyboardItems = [{ index: 0, url: "https://example.com" }];

  return (
    <div>
      <div className="p-4 border-b border-base-300">
        <h2 className="text-xl font-semibold">{title || "Storyboard"}</h2>
        <p className="text-sm text-base-content/70">
          {fragments} fragment
          {fragments !== 1 ? "s" : ""}
        </p>
      </div>
      <>
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
      </>

      <div className="p-4 border-t border-base-300 flex justify-end gap-2">
        <button
          onClick={() => {}}
          type="button"
          className="btn btn-error"
        >
          Delete
        </button>
        <button type="button" className="btn btn-primary" onClick={() => {}}>
          Save
        </button>
      </div>
    </div>
  );
}
