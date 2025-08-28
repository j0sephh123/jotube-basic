export type PlaylistSlice = {
  isModalOpen: boolean;
  ytChannelId: string | null;
  showCreateForm: boolean;
  closePlaylistModal: () => void;
  setShowCreateForm: (show: boolean) => void;
};

export const createPlaylistSlice = (
  set: (partial: Partial<PlaylistSlice>) => void
): PlaylistSlice => ({
  isModalOpen: false,
  ytChannelId: null,
  showCreateForm: false,
  closePlaylistModal: () =>
    set({
      isModalOpen: false,
      ytChannelId: null,
      showCreateForm: false,
    }),
  setShowCreateForm: (show: boolean) =>
    set({
      showCreateForm: show,
    }),
});
