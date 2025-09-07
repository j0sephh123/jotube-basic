import { useGetPlaylist } from "@features/Playlist";
import { useRefetchPlaylist } from "@features/Playlist";
import { UploadsListItem, useUploads } from "@features/Upload";
import { IdType, type PlaylistDetailsResponse } from "@shared/api";
import { StaticStates } from "@shared/ui";
import { PlaylistDetailsHeader } from "@widgets/PlaylistDetails";
import { Grid } from "@widgets/Grid";
import { useTypedParams } from "@shared/hooks";

export function PlaylistUploadsListPage() {
  const uploadsType = useTypedParams("uploadsType");
  const playlistId = useTypedParams("playlistId");

  console.log({ uploadsType });

  const { data, isLoading, error, refetch } = useUploads({
    id: { type: IdType.Playlist, value: Number(playlistId) },
    uploadsType,
  });

  const {
    data: playlist,
    loading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlaylist(null);

  const refetchPlaylist = useRefetchPlaylist();

  const handleSideEffect = () => {
    refetchPlaylist();
    refetch();
  };

  return (
    <StaticStates
      isLoading={isLoading || isPlaylistLoading}
      isError={!!error || !!playlistError}
      isEmpty={!data}
    >
      <PlaylistDetailsHeader
        playlist={playlist?.playlistDetails as PlaylistDetailsResponse}
      />
      <Grid>
        {data?.uploadsList?.map(
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
                channelTitle,
                ytChannelId,
              }}
              type={uploadsType}
              handleSideEffect={handleSideEffect}
            />
          )
        )}
      </Grid>
    </StaticStates>
  );
}
