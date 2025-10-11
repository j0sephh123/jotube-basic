import {
  setProcessingData,
  useStoryboardsProcessingState,
  setGridCols,
} from "@shared/store";
import type { UploadWithStoryboardResponse } from "@shared/api/generated/graphql";
// eslint-disable-next-line boundaries/element-types
import { Grid } from "@widgets/Grid";
import { useDeleteUploads, useSaveUpload } from "@features/Upload";
import { GenericSelect } from "@shared/ui";
import { useState, useEffect } from "react";
import { useTypedParams } from "@shared/hooks";
import { useRefetchPlaylist } from "@features/Playlist";
import { useRefetchChannelUploads } from "@features/Upload";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";

export function ManualStoryboardsPicker() {
  const { items, gridCols } = useStoryboardsProcessingState();
  const typesItems = items as UploadWithStoryboardResponse[];
  const [actionsVisible, setActionsVisible] = useState(false);
  const playlistId = useTypedParams("playlistId");
  const refetchPlaylist = useRefetchPlaylist();
  const refetchChannelUploads = useRefetchChannelUploads();
  const refetchChannelMetadata = useRefetchChannelMetadata();

  const handleSideEffect = () => {
    setProcessingData("storyboards", typesItems.slice(1));
    if (playlistId) {
      refetchPlaylist();
    }
  };

  const deleteUploadFromDbMutation = useDeleteUploads(handleSideEffect);
  const save = useSaveUpload(handleSideEffect);

  useEffect(() => {
    setActionsVisible(true);
  }, []);

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
    <div className="relative">
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
      <div
        className="h-[84vh] overflow-scroll relative"
        onMouseMove={(e) => {
          if (!actionsVisible) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const width = rect.width;

          if (x < width / 2) {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 255, 0.1)";
          } else {
            e.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        onClick={async (e) => {
          if (!actionsVisible) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const width = rect.width;

          if (x < width / 2) {
            await deleteUploadFromDbMutation({
              channelId: upload.channel.id,
              ytVideoIds: [upload.ytId],
            });
            handleSideEffect();
            refetchChannelMetadata();
            refetchChannelUploads();
            if (playlistId) {
              refetchPlaylist();
            }
          } else {
            await save({ uploads: [upload.ytId] });
            handleSideEffect();
            refetchChannelMetadata();
            refetchChannelUploads();
            if (playlistId) {
              refetchPlaylist();
            }
          }
        }}
      >
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
    </div>
  );
}
