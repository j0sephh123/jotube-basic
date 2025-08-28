import { useGetPlaylist, useGetPlaylistUploads } from "@features/Playlist";
import {
  useRefetchPlaylist,
  useRefetchPlaylistUploads,
} from "@features/Playlist";
import { UploadsListItem } from "@features/Upload";
import { type PlaylistDetailsResponse } from "@shared/api";
import { StaticStates } from "@shared/ui";
import { Link, useParams } from "react-router-dom";
import { PlaylistDetailsHeader } from "@widgets/PlaylistDetails";

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
  } = useGetPlaylist();

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
      <PlaylistDetailsHeader playlist={playlist?.playlistDetails as PlaylistDetailsResponse} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
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
                <Link to={`/channels/${ytChannelId}/saved`}>
                  <div className="text text-gray-400">{channelTitle}</div>
                </Link>
              }
            />
          )
        )}
      </div>
    </StaticStates>
  );
}
