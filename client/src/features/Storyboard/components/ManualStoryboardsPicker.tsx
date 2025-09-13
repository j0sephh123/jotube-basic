import {
  setProcessingData,
  useStoryboardsProcessingState,
  setGridCols,
} from "@shared/store";
import type { UploadWithStoryboardResponse } from "@shared/api/generated/graphql";
// eslint-disable-next-line boundaries/element-types
import { Grid } from "@widgets/Grid";
import { DeleteUpload, SaveUpload } from "@features/Upload";
import { GenericSelect } from "@shared/ui";

export function ManualStoryboardsPicker() {
  const { items, gridCols } = useStoryboardsProcessingState();
  const typesItems = items as UploadWithStoryboardResponse[];

  const handleSideEffect = () => {
    setProcessingData("storyboards", typesItems.slice(1));
  };

  const upload = typesItems[0];

  if (!upload) return null;

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
        <div className="flex">
          <h2 className="font-semibold">{upload.title || "Storyboard"}</h2>
          <div className="flex-1 flex justify-end mr-16">
            <GenericSelect
              value={gridCols}
              onChange={setGridCols}
              options={[
                { value: 1, label: "1 Column" },
                { value: 2, label: "2 Columns" },
                { value: 3, label: "3 Columns" },
                { value: 4, label: "4 Columns" },
              ]}
            />
          </div>
        </div>
        <p className="text-sm text-base-content/70">
          {storyboardFragments} fragment
          {storyboardFragments !== 1 ? "s" : ""}
          {" | "}
          Total uploads :{items.length}
        </p>
      </div>
      <div className="h-[84vh] overflow-scroll">
        <Grid cols={gridCols}>
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
      </div>

      <div className="p-4 border-t border-base-300 flex justify-end gap-2">
        <DeleteUpload
          handleSideEffect={handleSideEffect}
          channelId={upload.channel.id}
          ytVideoIds={[upload.ytId]}
        />
        <SaveUpload
          ytVideoId={upload.ytId}
          handleSideEffect={handleSideEffect}
        />
      </div>
    </div>
  );
}
