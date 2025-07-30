import { RotateCcw } from "lucide-react";
import { useStore } from "@/store/store";
import { RangePickerTypes } from "@/store/store-types";
import { formatLastSync } from "@/shared/utils/format";

import { UseMutationResult } from "@tanstack/react-query";

type Props = {
  metadata:
    | {
        lastSyncedAt: string | null;
      }
    | undefined;
  sortOrder: string;
  syncUploadsMutation: UseMutationResult<
    void,
    unknown,
    { ytChannelId: string; channelId: number }
  >;
  onToggleSortOrder: () => void;
  onSync: () => void;
};

const ChannelControls = ({
  metadata,
  sortOrder,
  syncUploadsMutation,
  onToggleSortOrder,
  onSync,
}: Props) => {
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
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            className={`btn btn-primary btn-sm ${
              syncUploadsMutation.isPending ? "btn-disabled" : ""
            }`}
            onClick={onSync}
          >
            Sync
            {syncUploadsMutation.isPending && (
              <span className="loading loading-spinner loading-xs" />
            )}
          </button>
          <span className="text-sm text-gray-400">
            {formatLastSync(metadata?.lastSyncedAt ?? null)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn btn-outline btn-sm" onClick={onToggleSortOrder}>
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
