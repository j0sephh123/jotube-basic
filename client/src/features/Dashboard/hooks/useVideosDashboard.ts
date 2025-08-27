// Local hook implementation to avoid cross-layer dependencies
const useLocalVideosDashboard = () => {
  return {
    videosRequestBody: {
      sortOrder: "DESC" as const,
      page: 1,
    },
    setVideosRequestBody: (_key: string, _value: unknown) => {},
  };
};

export const useVideosDashboard = () => {
  return useLocalVideosDashboard();
};
