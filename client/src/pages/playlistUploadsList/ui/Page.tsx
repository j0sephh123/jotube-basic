import { useGetPlaylist, useGetPlaylistUploads } from "@features/Playlist";
import {
  useRefetchPlaylist,
  useRefetchPlaylistUploads,
} from "@features/Playlist";
import { UploadsListItem } from "@features/Upload";
import { type PlaylistDetailsResponse } from "@shared/api";
import { CustomLink, StaticStates } from "@shared/ui";
import { useParams } from "react-router-dom";
import { PlaylistDetailsHeader } from "@widgets/PlaylistDetails";
import { Grid } from "@widgets/Grid";
import { makeYtChannelId } from "@shared/types";

export function PlaylistUploadsListPage() {
  const params = useParams<{
    id: string;
    uploadsType: "default" | "saved";
  }>();

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
              }}
              ytChannelId={ytChannelId}
              type={params.uploadsType as "default" | "saved"}
              handleSideEffect={handleSideEffect}
              channelTitleSlot={
                <CustomLink to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}>
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
