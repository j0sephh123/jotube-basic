import { ArrowUp, ArrowDown } from "lucide-react";
import { useVideosDashboardContext } from "@features/Dashboard";
import { Button } from "@shared/ui";
import { SortOrder } from "@shared/api";

export default function SelectSortDirection(): JSX.Element {
  const { videosRequestBody, setVideosRequestBody } =
    useVideosDashboardContext();

  const icons: Record<SortOrder, JSX.Element> = {
    [SortOrder.Asc]: <ArrowUp size={14} />,
    [SortOrder.Desc]: <ArrowDown size={14} />,
  };

  const labels: Record<SortOrder, string> = {
    [SortOrder.Asc]: "ASC",
    [SortOrder.Desc]: "DESC",
  };

  const toggleSortOrder = () => {
    const newSortOrder =
      videosRequestBody.sortOrder === SortOrder.Asc
        ? SortOrder.Desc
        : SortOrder.Asc;
    setVideosRequestBody("sortOrder", newSortOrder);
  };

  return (
    <Button onClick={toggleSortOrder}>
      {icons[videosRequestBody.sortOrder]}
      <span className="ml-2">
        {labels[videosRequestBody.sortOrder]}
      </span>
    </Button>
  );
}
