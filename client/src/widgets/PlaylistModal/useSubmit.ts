import {
  useRefetchPlaylist,
  useCreatePlaylist,
  useUpdatePlaylist,
  usePlaylistModalState,
} from "@features/Playlist";

export function useSubmit(value: string) {
  const { type, playlistId } = usePlaylistModalState();
  const refetchPlaylist = useRefetchPlaylist();
  const { mutate: createPlaylistMutation } = useCreatePlaylist();
  const { mutate: updatePlaylistMutation } = useUpdatePlaylist();

  return async () => {
    if (type === "create") {
      await createPlaylistMutation({
        variables: { createPlaylistInput: { name: value } },
      });
    } else if (type === "update") {
      await updatePlaylistMutation({
        variables: { id: playlistId, updatePlaylistInput: { name: value } },
        onCompleted: () => {
          refetchPlaylist();
        },
      });
    }
  };
}
