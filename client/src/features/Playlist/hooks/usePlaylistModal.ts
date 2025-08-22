import { usePlaylist } from "@features/Playlist";

export const usePlaylistModal = () => {
  const { isModalOpen, ytChannelId, closePlaylistModal, resetFormState } =
    usePlaylist();

  return {
    isModalOpen,
    ytChannelId,
    closePlaylistModal,
    resetFormState,
  };
};
