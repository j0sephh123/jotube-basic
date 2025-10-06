import { useSearchParams } from "react-router-dom";
import { Button } from "@shared/ui";
import {
  useSelectedItemsState,
  toggleSelectAll,
  deselectAllItems,
} from "@shared/store";
import { type UploadsListQueryResult } from "@shared/api";
import { ButtonWithDropdown } from "@widgets/ButtonWithDropdown";

interface ChannelHeaderControlsProps {
  uploadsData?: UploadsListQueryResult["data"];
}

export const ChannelHeaderControls = ({
  uploadsData,
}: ChannelHeaderControlsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "DESC") as "ASC" | "DESC";
  const selectedItemsState = useSelectedItemsState();

  const toggleSort = () => {
    setSearchParams((prev) => {
      const newSort = prev.get("sort") === "ASC" ? "DESC" : "ASC";
      prev.set("sort", newSort);
      return prev;
    });
  };

  const handleToggleSelectAll = () => {
    if (!uploadsData?.uploadsList) return;
    const allVideoIds = uploadsData.uploadsList.map((upload) => upload.ytId);
    toggleSelectAll(allVideoIds);
  };

  const handleDeselectAll = () => {
    deselectAllItems();
  };

  const selectedCount = selectedItemsState.selectedIds.length;
  const totalCount = uploadsData?.uploadsList?.length ?? 0;
  const hasSelection = selectedCount > 0;

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={toggleSort}>
        Sort:
        {sortOrder === "ASC" ? "↑ Oldest first" : "↓ Newest first"}
      </Button>

      <ButtonWithDropdown
        buttonText="Demo Actions"
        onButtonClick={() => console.log("Demo button clicked")}
        dropdownItems={[
          <button key="1" onClick={() => console.log("Download selected")}>
            Download Selected
          </button>,
          <button key="2" onClick={() => console.log("Delete selected")}>
            Delete Selected
          </button>,
          <button key="3" onClick={() => console.log("Export selected")}>
            Export Selected
          </button>,
          <button key="4" onClick={() => console.log("Share selected")}>
            Share Selected
          </button>,
        ]}
      />

      {hasSelection && (
        <>
          <span className="text-sm text-gray-400">
            {selectedCount} of {totalCount} selected
          </span>
          <Button onClick={handleDeselectAll} className="btn-sm btn-outline">
            Deselect All
          </Button>
        </>
      )}

      {totalCount > 0 && (
        <Button onClick={handleToggleSelectAll} className="btn-sm btn-outline">
          {hasSelection && selectedCount === totalCount
            ? "Deselect All"
            : "Select All"}
        </Button>
      )}
    </div>
  );
};
