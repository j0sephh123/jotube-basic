import {
  Modal,
  useCreateEntityForm,
  CreateEntityForm,
  IconPlaylist,
} from "@shared/ui";
import {
  closePlaylistModal,
  useCreatePlaylist,
  usePlaylistModalState,
  useRefetchPlaylist,
  useUpdatePlaylist,
} from "@features/Playlist";
import { useGetPlaylist } from "@features/Playlist";
import { useEffect } from "react";

export default function PlaylistModal() {
  const { type, playlistId } = usePlaylistModalState();
  const { data: playlist } = useGetPlaylist(playlistId);
  const refetchPlaylist = useRefetchPlaylist();
  const { mutate: createPlaylistMutation } = useCreatePlaylist();
  const { mutate: updatePlaylistMutation } = useUpdatePlaylist();
  const { value, inputRef, handleInputChange, clearInput } =
    useCreateEntityForm(type !== null);

  useEffect(() => {
    if (playlistId && playlist) {
      handleInputChange(playlist.playlistDetails?.name || "");
    }
  }, [handleInputChange, playlist, playlistId]);

  const handleCloseModal = () => {
    closePlaylistModal();
    clearInput();
  };

  const handleSubmit = async () => {
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
    handleCloseModal();
  };

  return (
    <Modal
      isModalVisible={type !== null}
      onClose={handleCloseModal}
      maxWidth="90vw"
      maxHeight="90vh"
    >
      <div className="p-4 w-[90vw] h-[90vh]">
        <CreateEntityForm
          value={value}
          inputRef={inputRef}
          handleInputChange={(e) => handleInputChange(e.target.value.trim())}
          placeholder="Enter playlist name"
          actions={
            <div className="flex justify-end gap-3 mt-4">
              <button className="btn btn-outline" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => handleSubmit()}
              >
                {type === "create" ? "Create Playlist" : "Update Playlist"}
              </button>
            </div>
          }
          title={
            <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <IconPlaylist />
              <span>
                {type === "create" ? "Create Playlist" : "Update Playlist"}
              </span>
            </h2>
          }
          label={
            <label className="label py-1">
              <span className="label-text text-base font-semibold">
                {type === "create" ? "Playlist name" : "Update playlist name"}
              </span>
              <span className="label-text-alt text-xs opacity-70">
                Must be 100 characters
              </span>
            </label>
          }
        />
      </div>
    </Modal>
  );
}
