// Local enum to avoid app dependency
enum LocalRangePickerTypes {
  PROCESSED = "processed",
  DEFAULTS = "defaults",
}

export type RangePickerConfig = {
  values: ReadonlyArray<number>;
  min: number;
  max: number;
  stepSize: number;
};

export type RangePickersSlice = {
  rangePickers: Record<LocalRangePickerTypes, RangePickerConfig>;
  setRangePicker: (
    key: LocalRangePickerTypes,
    config: RangePickerConfig
  ) => void;
  updateRangePickerValues: (
    key: LocalRangePickerTypes,
    values: ReadonlyArray<number>
  ) => void;
  getRangePicker: (key: LocalRangePickerTypes) => RangePickerConfig | undefined;
};

export const createRangePickersSlice = (
  set: (
    fn: (state: {
      rangePickers: Record<LocalRangePickerTypes, RangePickerConfig>;
    }) => {
      rangePickers: Record<LocalRangePickerTypes, RangePickerConfig>;
    }
  ) => void,
  get: () => {
    rangePickers: Record<LocalRangePickerTypes, RangePickerConfig>;
  }
): RangePickersSlice => {
  const processedRangePickerConfig = {
    min: 0,
    max: 2000,
    stepSize: 1,
  };

  const defaultsRangePickerConfig = {
    min: 0,
    max: 2000,
    stepSize: 5,
  };

  return {
    rangePickers: {
      [LocalRangePickerTypes.PROCESSED]: {
        values: [
          processedRangePickerConfig.min,
          processedRangePickerConfig.max,
        ],
        min: processedRangePickerConfig.min,
        max: processedRangePickerConfig.max,
        stepSize: processedRangePickerConfig.stepSize,
      },
      [LocalRangePickerTypes.DEFAULTS]: {
        values: [defaultsRangePickerConfig.min, defaultsRangePickerConfig.max],
        min: defaultsRangePickerConfig.min,
        max: defaultsRangePickerConfig.max,
        stepSize: defaultsRangePickerConfig.stepSize,
      },
    },

    setRangePicker: (key, config) => {
      set((state) => ({
        rangePickers: {
          ...state.rangePickers,
          [key]: config,
        },
      }));
    },

    updateRangePickerValues: (key, values) => {
      set((state) => ({
        rangePickers: {
          ...state.rangePickers,
          [key]: {
            ...state.rangePickers[key]!,
            values,
          },
        },
      }));
    },

    getRangePicker: (key) => {
      return get().rangePickers[key];
    },
  };
};
