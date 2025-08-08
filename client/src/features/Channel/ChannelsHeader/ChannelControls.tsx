import { RotateCcw } from "lucide-react";
import { useStore } from "@/store/store";
import { RangePickerTypes } from "@/store/store-types";
import { useSearchParams } from "react-router-dom";

type Props = {
  leftSlot: React.ReactNode;
};

const ChannelControls = ({ leftSlot }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "desc") as "asc" | "desc";
  const toggleSortOrder = () => {
    setSearchParams((prev) => {
      const newSort = prev.get("sort") === "asc" ? "desc" : "asc";
      prev.set("sort", newSort);
      return prev;
    });
  };

  const { updateRangePickerValues } = useStore();

  const handleResetRangeFilters = () => {
    const processedRangePicker = useStore
      .getState()
      .getRangePicker(RangePickerTypes.PROCESSED);
    const defaultsRangePicker = useStore
      .getState()
      .getRangePicker(RangePickerTypes.DEFAULTS);

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

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
      <div className="flex flex-wrap items-center gap-4">{leftSlot}</div>
      <div className="flex items-center gap-2">
        <button className="btn btn-outline btn-sm" onClick={toggleSortOrder}>
          Sort:
          {sortOrder === "asc" ? "↑ Oldest first" : "↓ Newest first"}
        </button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={handleResetRangeFilters}
          title="Reset range filters"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChannelControls;
