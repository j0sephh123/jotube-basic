import { RangePickerTypes } from "@/app/providers/store/store-types";

export type RangePickerConfig = {
  values: ReadonlyArray<number>;
  min: number;
  max: number;
  stepSize: number;
};

export type RangePickersSlice = {
  rangePickers: Record<RangePickerTypes, RangePickerConfig>;
  setRangePicker: (key: RangePickerTypes, config: RangePickerConfig) => void;
  updateRangePickerValues: (
    key: RangePickerTypes,
    values: ReadonlyArray<number>
  ) => void;
  getRangePicker: (key: RangePickerTypes) => RangePickerConfig | undefined;
};

export const createRangePickersSlice = (
  set: (
    fn: (state: {
      rangePickers: Record<RangePickerTypes, RangePickerConfig>;
    }) => {
      rangePickers: Record<RangePickerTypes, RangePickerConfig>;
    }
  ) => void,
  get: () => {
    rangePickers: Record<RangePickerTypes, RangePickerConfig>;
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
      [RangePickerTypes.PROCESSED]: {
        values: [
          processedRangePickerConfig.min,
          processedRangePickerConfig.max,
        ],
        min: processedRangePickerConfig.min,
        max: processedRangePickerConfig.max,
        stepSize: processedRangePickerConfig.stepSize,
      },
      [RangePickerTypes.DEFAULTS]: {
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
