import { useGetPlaylist, useGetPlaylistUploads } from "@features/Playlist";
import {
  useRefetchPlaylist,
  useRefetchPlaylistUploads,
} from "@features/Playlist";
import { UploadsListItem } from "@features/Upload";
import { type PlaylistDetailsResponse } from "@shared/api";
import { CustomLink, StaticStates } from "@shared/ui";
import { PlaylistDetailsHeader } from "@widgets/PlaylistDetails";
import { Grid } from "@widgets/Grid";
import { makeYtChannelId } from "@shared/types";
import { useTypedParams } from "@shared/hooks";

export function PlaylistUploadsListPage() {
  const uploadsType = useTypedParams("uploadsType");

  const { data, loading, error } = useGetPlaylistUploads();

  const {
    data: playlist,
    loading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlaylist(null);

  const refetchPlaylist = useRefetchPlaylist();
  const refetchPlaylistUploads = useRefetchPlaylistUploads();

  const handleSideEffect = () => {
    refetchPlaylist();
    refetchPlaylistUploads();
  };

  return (
    <StaticStates
      isLoading={loading || isPlaylistLoading}
      isError={!!error || !!playlistError}
      isEmpty={!data}
    >
      <PlaylistDetailsHeader
        playlist={playlist?.playlistDetails as PlaylistDetailsResponse}
      />
      <Grid>
        {data?.playlistUploadsList?.uploads.map(
          ({
            ytId,
            id,
            title,
            publishedAt,
            ytChannelId,
            src,
            channelTitle,
          }) => (
            <UploadsListItem
              key={ytId}
              upload={{
                id,
                ytId,
                title,
                publishedAt,
                src,
                channelId: id,
              }}
              ytChannelId={ytChannelId}
              channelId={id}
              type={uploadsType}
              handleSideEffect={handleSideEffect}
              channelTitleSlot={
                <CustomLink
                  to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}
                >
                  <div className="text text-gray-400">{channelTitle}</div>
                </CustomLink>
              }
            />
          )
        )}
      </Grid>
    </StaticStates>
  );
}
