import { useSearchParams } from "react-router-dom";
import { Button } from "@shared/ui";

export const ChannelHeaderControls = () => {
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
    <div className="flex items-center gap-2">
      <Button onClick={toggleSort}>
        Sort:
        {sortOrder === "ASC" ? "↑ Oldest first" : "↓ Newest first"}
      </Button>
    </div>
  );
};
