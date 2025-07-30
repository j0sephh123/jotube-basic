export type IgnoreListItem = {
  ytId: string;
  title: string;
};

export type IgnoreListSlice = {
  ignoreList: IgnoreListItem[];
  addToIgnoreList: (ytId: string, title: string) => void;
  removeFromIgnoreList: (ytId: string) => void;
  isIgnored: (ytId: string) => boolean;
  clearIgnoreList: () => void;
};

export const createIgnoreListSlice = (
  set: (
    fn: (state: { ignoreList: IgnoreListItem[] }) => {
      ignoreList: IgnoreListItem[];
    }
  ) => void,
  get: () => { ignoreList: IgnoreListItem[] }
): IgnoreListSlice => ({
  ignoreList: [],

  addToIgnoreList: (ytId: string, title: string) => {
    set((state) => {
      const existingItem = state.ignoreList.find((item) => item.ytId === ytId);
      if (existingItem) {
        return state;
      }

      return {
        ignoreList: [...state.ignoreList, { ytId, title }],
      };
    });
  },

  removeFromIgnoreList: (ytId: string) => {
    set((state) => ({
      ignoreList: state.ignoreList.filter((item) => item.ytId !== ytId),
    }));
  },

  isIgnored: (ytId: string) => {
    const state = get();
    return state.ignoreList.some((item) => item.ytId === ytId);
  },

  clearIgnoreList: () => {
    set(() => ({
      ignoreList: [],
    }));
  },
});
