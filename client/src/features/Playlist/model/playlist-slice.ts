export type PlaylistSlice = {
  isModalOpen: boolean;
  ytChannelId: string | null;
  showCreateForm: boolean;
  openPlaylistModal: (ytChannelId: string) => void;
  closePlaylistModal: () => void;
  setShowCreateForm: (show: boolean) => void;
  resetFormState: () => void;
};

export const createPlaylistSlice = (
  set: (partial: Partial<PlaylistSlice>) => void
): PlaylistSlice => ({
  isModalOpen: false,
  ytChannelId: null,
  showCreateForm: false,
  openPlaylistModal: (ytChannelId: string) =>
    set({
      isModalOpen: true,
      ytChannelId,
      showCreateForm: false,
    }),
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
  resetFormState: () =>
    set({
      showCreateForm: false,
    }),
});
