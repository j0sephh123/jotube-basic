export type PlaylistSlice = {
  isModalOpen: boolean;
  ytChannelId: string | null;
  openPlaylistModal: (ytChannelId: string) => void;
  closePlaylistModal: () => void;
};

export const createPlaylistSlice = (
  set: (partial: Partial<PlaylistSlice>) => void
): PlaylistSlice => ({
  isModalOpen: false,
  ytChannelId: null,
  openPlaylistModal: (ytChannelId: string) =>
    set({
      isModalOpen: true,
      ytChannelId,
    }),
  closePlaylistModal: () =>
    set({
      isModalOpen: false,
      ytChannelId: null,
    }),
});
