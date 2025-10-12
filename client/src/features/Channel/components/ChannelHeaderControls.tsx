import { useSearchParams } from "react-router-dom";
import { Button } from "@shared/ui";
import { type UploadsListQueryResult } from "@shared/api";

interface ChannelHeaderControlsProps {
  uploadsData?: UploadsListQueryResult["data"];
}

export const ChannelHeaderControls = ({
  uploadsData: _uploadsData,
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
    </div>
  );
};
