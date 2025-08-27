import { useGetPlaylist } from "@features/Playlist";
import { UploadsListItem } from "@features/Upload";
import {
  type PlaylistDetailsResponse,
  useGetPlaylistUploadsListQuery,
} from "@shared/api";
import { StaticStates } from "@shared/ui";
import { Header } from "@widgets/PlaylistDetails";
import { Link, useParams } from "react-router-dom";

export function PlaylistUploadsListPage() {
  const params = useParams<{
    id: string;
    uploadsType: "default" | "saved";
  }>();

  const { data, loading, error } = useGetPlaylistUploadsListQuery({
    variables: {
      playlistUploadsListInput: {
        playlistId: Number(params.id),
        uploadsType: params.uploadsType as "default" | "saved",
      },
    },
  });

  const {
    data: playlist,
    loading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlaylist();

  return (
    <StaticStates
      isLoading={loading || isPlaylistLoading}
      isError={!!error || !!playlistError}
      isEmpty={!data}
    >
      <Header playlist={playlist?.playlistDetails as PlaylistDetailsResponse} />
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
              handleSideEffect={() => undefined}
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
