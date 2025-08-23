// Local hook implementation to avoid cross-layer dependencies
const useLocalRangePickers = () => {
  return {
    rangePickers: {},
    setRangePicker: (_key: string, _config: Record<string, unknown>) => {},
    updateRangePickerValues: (
      _key: string,
      _values: ReadonlyArray<number>
    ) => {},
    getRangePicker: (_key: string) => undefined,
  };
};

export const useRangePickersStore = () => {
  return useLocalRangePickers();
};
