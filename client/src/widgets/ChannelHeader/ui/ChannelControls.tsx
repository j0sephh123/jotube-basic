import { useSearchParams } from "react-router-dom";
import { Button } from "@shared/ui";

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

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">{leftSlot}</div>
      <div className="flex items-center gap-2">
        <Button onClick={toggleSort}>
          Sort:
          {sortOrder === "ASC" ? "↑ Oldest first" : "↓ Newest first"}
        </Button>
      </div>
    </div>
  );
};

export default ChannelControls;
