import { useSearchParams } from "react-router-dom";
import { Button } from "@shared/ui";
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

  const toggleSort = () => {
    setSearchParams((prev) => {
      const newSort = prev.get("sort") === "ASC" ? "DESC" : "ASC";
      prev.set("sort", newSort);
      return prev;
    });
  };

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
    </div>
  );
};
