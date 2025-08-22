import { useStore } from "@/app/providers/store/store";

export const usePlaylistModal = () => {
  const { isModalOpen, ytChannelId, closePlaylistModal, resetFormState } =
    useStore();

  return {
    isModalOpen,
    ytChannelId,
    closePlaylistModal,
    resetFormState,
  };
};
