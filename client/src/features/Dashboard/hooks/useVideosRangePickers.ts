// Local hook implementation to avoid cross-layer dependencies
const useLocalVideosRangePickers = () => {
  return {
    videosRangePickers: {},
    setVideosRangePicker: (
      _key: string,
      _config: Record<string, unknown>
    ) => {},
    updateVideosRangePickerValues: (
      _key: string,
      _values: ReadonlyArray<number>
    ) => {},
    getVideosRangePicker: (_key: string) => undefined,
  };
};

export const useVideosRangePickers = () => {
  return useLocalVideosRangePickers();
};
