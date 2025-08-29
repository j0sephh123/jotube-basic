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
} from "@features/Playlist";

export default function PlaylistModal() {
  const { type, playlistId } = usePlaylistModalState();
  const { mutate: createPlaylistMutation } = useCreatePlaylist();
  const { value, inputRef, handleInputChange, clearInput } =
    useCreateEntityForm(type !== null);

  const handleCloseModal = () => {
    closePlaylistModal();
    clearInput();
  };

  const handlePlaylistCreate = async () => {
    await createPlaylistMutation({
      variables: { createPlaylistInput: { name: value } },
    });
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
        <h2 className="text-xl font-bold mb-4">{type} playlist</h2>
        <CreateEntityForm
          value={value}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          placeholder="Enter playlist name"
          actions={
            <div className="flex justify-end gap-3 mt-4">
              <button className="btn btn-outline" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => handlePlaylistCreate()}
              >
                Create Playlist
              </button>
            </div>
          }
          title={
            <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <IconPlaylist />
              <span>Create Playlist</span>
            </h2>
          }
          label={
            <label className="label py-1">
              <span className="label-text text-base font-semibold">
                Playlist name
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
