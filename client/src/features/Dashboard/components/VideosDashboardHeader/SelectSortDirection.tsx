import { ArrowUp, ArrowDown } from "lucide-react";
import { useVideosDashboardContext } from "../../hooks/useVideosDashboardContext";
import { SortOrder } from "@/shared/types/searchParams";
import Button from "@/shared/components/button";

export default function SelectSortDirection(): JSX.Element {
  const { videosRequestBody, setVideosRequestBody } =
    useVideosDashboardContext();

  const icons: Record<SortOrder, JSX.Element> = {
    asc: <ArrowUp size={14} />,
    desc: <ArrowDown size={14} />,
  };

  const labels: Record<SortOrder, string> = {
    asc: "ASC",
    desc: "DESC",
  };

  const toggleSortOrder = () => {
    const newSortOrder = videosRequestBody.sortOrder === "asc" ? "desc" : "asc";
    setVideosRequestBody("sortOrder", newSortOrder);
  };

  return (
    <Button onClick={toggleSortOrder}>
      {icons[videosRequestBody.sortOrder as SortOrder]}
      <span className="ml-2">
        {labels[videosRequestBody.sortOrder as SortOrder]}
      </span>
    </Button>
  );
}
