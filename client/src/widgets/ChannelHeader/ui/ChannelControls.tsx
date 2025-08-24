import { RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@shared/ui";

type Props = {
  leftSlot: React.ReactNode;
  onResetRangeFilters: () => void;
  areControlsDisabled: boolean;
};

const ChannelControls = ({
  leftSlot,
  onResetRangeFilters,
  areControlsDisabled,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "DESC") as "ASC" | "DESC";

  const toggleSort = () => {
    setSearchParams((prev) => {
      const newSort = prev.get("sort") === "ASC" ? "DESC" : "ASC";
      prev.set("sort", newSort);
      return prev;
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">{leftSlot}</div>
      <div className="flex items-center gap-2">
        <Button onClick={toggleSort} disabled={areControlsDisabled}>
          Sort:
          {sortOrder === "ASC" ? "↑ Oldest first" : "↓ Newest first"}
        </Button>
        <Button
          color="neutral"
          variant="ghost"
          size="sm"
          onClick={onResetRangeFilters}
          title="Reset range filters"
          disabled={areControlsDisabled}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChannelControls;
