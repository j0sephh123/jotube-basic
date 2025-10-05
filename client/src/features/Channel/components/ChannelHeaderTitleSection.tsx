/* eslint-disable import/no-internal-modules */
import { CardMenu, CustomLink } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import { PlaylistControl } from "@features/Playlist";
import {
  SyncUploadsButton,
  CleanShortUploads,
  useCreateStoryboard,
} from "@features/Upload";
import { useTypedParams } from "@shared/hooks";
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";
import { useSelectedItemsState } from "@shared/store";

interface TopLeftProps {
  ytChannelId: string;
  channelId: number;
}

export const ChannelHeaderTitleSection = ({
  ytChannelId,
  channelId,
}: TopLeftProps) => {
  const uploadsType = useTypedParams("uploadsType");

  const { data: channelMetadata } = useChannelMetadataQuery(channelId);
  const { mutateAsync: downloadStoryboards } = useCreateStoryboard();
  const selectedItemsState = useSelectedItemsState();
  console.log("selectedItemsState:", selectedItemsState);

  const handleGetStoryboards = () => {
    if (selectedItemsState.selectedIds.length === 0) {
      downloadStoryboards({
        ids: [ytChannelId],
        resourceType: "channel",
      });
    } else {
      downloadStoryboards({
        ids: selectedItemsState.selectedIds.slice(),
        resourceType: "video",
      });
    }
  };

  if (!channelMetadata) return null;

  const { title, id, playlist } = channelMetadata;

  return (
    <>
      <CustomLink to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}>
        <h2 className="text-xl font-bold pr-4">{title}</h2>
      </CustomLink>
      <CardMenu id={id} ytId={ytChannelId} />
      <PlaylistControl
        id={id}
        playlistId={playlist?.id ?? 0}
        playlistName={playlist?.name ?? "No playlist"}
      />

      {uploadsType === "default" && (
        <>
          <SyncUploadsButton
            lastSyncedAt={channelMetadata?.lastSyncedAt ?? null}
            id={channelMetadata?.id ?? 0}
          />
          <CleanShortUploads channelId={channelId} />
          <button
            className="btn btn-secondary btn-outline"
            onClick={handleGetStoryboards}
          >
            Get Storyboards
          </button>
        </>
      )}
    </>
  );
};
