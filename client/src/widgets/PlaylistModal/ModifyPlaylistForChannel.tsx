import { useRefetchChannelsDashboardQuery } from "@features/Dashboard";
import {
  closePlaylistModal,
  useGetPlaylists,
  usePlaylistModalState,
  useUpdateChannelPlaylist,
} from "@features/Playlist";
import { Select, StaticStates } from "@shared/ui";
import { useMemo } from "react";

type SimplePlaylist = {
  id: number;
  name: string;
};

const EMPTY_PLAYLIST: SimplePlaylist = { id: 0, name: "Select a playlist..." };

export function ModifyPlaylistForChannel() {
  const { channelId, playlistId } = usePlaylistModalState();
  const { data: playlists, loading, error } = useGetPlaylists();
  const simplePlaylists = useMemo<SimplePlaylist[]>(
    () =>
      playlists?.map((p) => ({
        id: p.id,
        name: p.name,
      })) ?? [],
    [playlists]
  );

  const playlistInDb = useMemo(
    () => playlists?.find((p) => p.id === playlistId),
    [playlists, playlistId]
  );

  const optionsWithPlaceholder = [
    { id: 0, name: "Select a playlist..." },
    ...(simplePlaylists || []),
  ];

  const updateChannelPlaylist = useUpdateChannelPlaylist();
  const refetchChannelsDashboardQuery = useRefetchChannelsDashboardQuery();
  const handleSave = (playlist: SimplePlaylist | null) => {
    updateChannelPlaylist.mutate({
      variables: {
        updateChannelPlaylistInput: {
          channelId: channelId!,
          playlistId: playlist?.id === 0 ? null : playlist!.id,
        },
      },
      onCompleted: () => {
        closePlaylistModal();
        refetchChannelsDashboardQuery();
      },
    });
  };

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!playlists}>
      ModifyPlaylistForChannel
      <Select
        options={optionsWithPlaceholder}
        value={playlistInDb ?? EMPTY_PLAYLIST}
        onChange={handleSave}
        getOptionValue={({ id }) => id}
        getOptionLabel={({ name }) => name}
      />
    </StaticStates>
  );
}
