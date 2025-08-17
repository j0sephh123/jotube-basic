import { RotateCcw } from "lucide-react";
import { useStore } from "@/store/store";
import { RangePickerTypes } from "@/store/store-types";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/shared/ui/button";

type Props = {
  leftSlot: React.ReactNode;
};

const ChannelControls = ({ leftSlot }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "DESC") as "ASC" | "DESC";
  const toggleSort = () => {
    setSearchParams((prev) => {
      const newSort = prev.get("sort") === "ASC" ? "DESC" : "ASC";
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
        <Button onClick={toggleSort}>
          Sort:
          {sortOrder === "ASC" ? "↑ Oldest first" : "↓ Newest first"}
        </Button>
        <Button
          color="neutral"
          variant="ghost"
          size="sm"
          onClick={handleResetRangeFilters}
          title="Reset range filters"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChannelControls;
