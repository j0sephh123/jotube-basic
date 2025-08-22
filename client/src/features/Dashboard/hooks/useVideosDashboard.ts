// Local hook implementation to avoid cross-layer dependencies
const useLocalVideosDashboard = () => {
  return {
    videosRequestBody: {
      sortOrder: "DESC" as const,
      page: 1,
      minScreenshots: 0,
      maxScreenshots: null,
    },
    setVideosRequestBody: (_key: string, _value: unknown) => {},
  };
};

export const useVideosDashboard = () => {
  return useLocalVideosDashboard();
};
