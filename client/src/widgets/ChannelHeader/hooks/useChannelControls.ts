import { useRangePickers } from "@app/providers/store/store-hooks";
import { RangePickerTypes } from "@features/Dashboard/RangePicker/model/types";

export const useChannelControls = () => {
  const { updateRangePickerValues, getRangePicker } = useRangePickers();

  const handleResetRangeFilters = () => {
    const processedRangePicker = getRangePicker(RangePickerTypes.PROCESSED);
    const defaultsRangePicker = getRangePicker(RangePickerTypes.DEFAULTS);

    if (processedRangePicker) {
      updateRangePickerValues(RangePickerTypes.PROCESSED, [
        processedRangePicker.min,
        processedRangePicker.max,
      ]);
    }

    if (defaultsRangePicker) {
      updateRangePickerValues(RangePickerTypes.DEFAULTS, [
        defaultsRangePicker.min,
        defaultsRangePicker.max,
      ]);
    }
  };

  return {
    handleResetRangeFilters,
  };
};
