import type { SortOrder } from "@shared/api";

export const videosDefaults: {
  sortOrder: SortOrder;
  page: number;
} = {
  sortOrder: "desc" as SortOrder,
  page: 1,
};

export type VideosDashboardSlice = {
  videosRequestBody: typeof videosDefaults;
  setVideosRequestBody: <K extends keyof typeof videosDefaults>(
    key: K,
    value: (typeof videosDefaults)[K]
  ) => void;
};

export const createVideosDashboardSlice = (
  set: (
    fn: (state: { videosRequestBody: typeof videosDefaults }) => {
      videosRequestBody: typeof videosDefaults;
    }
  ) => void
): VideosDashboardSlice => ({
  videosRequestBody: { ...videosDefaults },

  setVideosRequestBody: (key, value) => {
    set((state) => ({
      videosRequestBody: {
        ...state.videosRequestBody,
        [key]: value,
        page: key === "page" ? (value as number) : state.videosRequestBody.page,
      },
    }));
  },
});
