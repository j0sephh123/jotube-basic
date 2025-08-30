import { useGetPlaylists } from "@features/Playlist";
import type { Playlist } from "@features/Playlist";
import { Select, StaticStates } from "@shared/ui";
import { useState } from "react";

export function ModifyChannelForPlaylist() {
  return <div>ModifyChannelForPlaylist</div>;
  // {
  //   playlistId: Playlist;
  // }) {
  // const { data: playlists, loading, error } = useGetPlaylists();
  // const playlistDetails = useGetPlaylistDetails(selectedPlaylist?.id!);

  // const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
  //   null
  // );

  // return (
  //   <StaticStates isLoading={loading} isError={!!error} isEmpty={!playlists}>
  //     ModifyChannelForPlaylist
  //     <Select
  //       options={playlists!}
  //       value={selectedPlaylist}
  //       onChange={(value) => setSelectedPlaylist(value!)}
  //       getOptionValue={(option) => option.id.toString()}
  //       getOptionLabel={(option) => option.name}
  //     />
  //   </StaticStates>
  // );
}
