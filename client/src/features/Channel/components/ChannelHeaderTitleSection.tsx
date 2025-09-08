/* eslint-disable import/no-internal-modules */
import { CardMenu, CustomLink } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import { PlaylistControl } from "@features/Playlist";
import { SyncUploadsButton, CleanShortUploads } from "@features/Upload";
import { useTypedParams } from "@shared/hooks";
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";

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
        </>
      )}
    </>
  );
};
