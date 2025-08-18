import { Store, WebSocketSlice } from "@store/store-types";

export const createWebSocketSlice = (
  set: (fn: (state: Store) => Partial<Store>) => void
): WebSocketSlice => ({
  operations: {
    download: null,
    screenshots: null,
    thumbnails: null,
  },
  setOperation: (type, data) =>
    set((state) => {
      if (!data) {
        return {
          operations: {
            ...state.operations,
            [type]: null,
          },
        };
      }

      const { filename, progress, current } = data;
      const operation = {
        filename,
        ...(type === "download" && progress
          ? { progress: parseInt(progress) }
          : type === "screenshots" && current
          ? { current }
          : {}),
      };

      return {
        operations: {
          ...state.operations,
          [type]: operation,
        },
      };
    }),
});
