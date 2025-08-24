import { create } from "zustand";

type RangePickerConfig = {
  values: ReadonlyArray<number>;
  min: number;
  max: number;
  stepSize: number;
};

type RangePickersStore = {
  rangePickers: Record<string, RangePickerConfig>;
  setRangePicker: (key: string, config: RangePickerConfig) => void;
  updateRangePickerValues: (key: string, values: ReadonlyArray<number>) => void;
  getRangePicker: (key: string) => RangePickerConfig | undefined;
};

const useStore = create<RangePickersStore>((set, get) => ({
  rangePickers: {},
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
}));

export const useRangePickersStore = () => {
  return useStore();
};
