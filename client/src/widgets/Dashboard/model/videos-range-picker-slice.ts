export type VideosRangePickerConfig = {
  values: ReadonlyArray<number>;
  min: number;
  max: number;
  stepSize: number;
};

export type VideosRangePickersSlice = {
  videosRangePickers: Record<string, VideosRangePickerConfig>;
  setVideosRangePicker: (key: string, config: VideosRangePickerConfig) => void;
  updateVideosRangePickerValues: (
    key: string,
    values: ReadonlyArray<number>
  ) => void;
  getVideosRangePicker: (key: string) => VideosRangePickerConfig | undefined;
};

export const createVideosRangePickersSlice = (
  set: (
    fn: (state: {
      videosRangePickers: Record<string, VideosRangePickerConfig>;
    }) => {
      videosRangePickers: Record<string, VideosRangePickerConfig>;
    }
  ) => void,
  get: () => {
    videosRangePickers: Record<string, VideosRangePickerConfig>;
  }
): VideosRangePickersSlice => {
  const screenshotsRangePickerConfig = {
    min: 0,
    max: 1000,
    stepSize: 1,
  };

  return {
    videosRangePickers: {
      screenshots: {
        values: [
          screenshotsRangePickerConfig.min,
          screenshotsRangePickerConfig.max,
        ],
        min: screenshotsRangePickerConfig.min,
        max: screenshotsRangePickerConfig.max,
        stepSize: screenshotsRangePickerConfig.stepSize,
      },
    },

    setVideosRangePicker: (key, config) => {
      set((state) => ({
        videosRangePickers: {
          ...state.videosRangePickers,
          [key]: config,
        },
      }));
    },

    updateVideosRangePickerValues: (key, values) => {
      set((state) => ({
        videosRangePickers: {
          ...state.videosRangePickers,
          [key]: {
            ...state.videosRangePickers[key]!,
            values,
          },
        },
      }));
    },

    getVideosRangePicker: (key) => {
      return get().videosRangePickers[key];
    },
  };
};
