import { CardMenu, CustomLink } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import { PlaylistControl } from "@features/Playlist";
import { SyncUploadsButton, CleanShortUploads } from "@features/Upload";

interface TopLeftProps {
  title: string;
  id: number;
  ytChannelId: string;
  playlist?: { id: number; name: string } | null;
  isUploadsPage: boolean;
  channelMetadata?: {
    lastSyncedAt?: string | null | undefined;
    id: number;
  } | null;
  channelId: number;
}

export const ChannelTitleSection = ({
  title,
  id,
  ytChannelId,
  playlist,
  isUploadsPage,
  channelMetadata,
  channelId,
}: TopLeftProps) => {
  return (
    <div className="flex items-center gap-2">
      <CustomLink to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}>
        <h2 className="text-xl font-bold pr-4">{title}</h2>
      </CustomLink>
      <CardMenu id={id} ytId={ytChannelId} />
      <PlaylistControl
        isPlaylistPage={false}
        id={id}
        playlistId={playlist?.id ?? 0}
        playlistName={playlist?.name ?? "No playlist"}
      />
      {isUploadsPage && (
        <>
          <SyncUploadsButton
            lastSyncedAt={channelMetadata?.lastSyncedAt ?? null}
            id={channelMetadata?.id ?? 0}
          />
          <CleanShortUploads channelId={channelId} />
        </>
      )}
    </div>
  );
};
