export type SidePanelSlice = {
  isOpen: boolean;
  videoId: string | null;
  channelId: string | null;
  openSidePanel: (videoId: string, channelId: string) => void;
  closeSidePanel: () => void;
};

export const createSidePanelSlice = (set: any): SidePanelSlice => ({
  isOpen: false,
  videoId: null,
  channelId: null,
  openSidePanel: (videoId: string, channelId: string) =>
    set({
      isOpen: true,
      videoId,
      channelId,
    }),
  closeSidePanel: () =>
    set({
      isOpen: false,
      videoId: null,
      channelId: null,
    }),
});
