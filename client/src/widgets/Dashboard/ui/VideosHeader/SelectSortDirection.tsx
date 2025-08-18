import { ArrowUp, ArrowDown } from "lucide-react";
import { useVideosDashboardContext } from "@/widgets/Dashboard/model/useVideosDashboardContext";
import Button from "@/shared/ui/button";
import { SortOrder } from "@/generated/graphql";

export default function SelectSortDirection(): JSX.Element {
  const { videosRequestBody, setVideosRequestBody } =
    useVideosDashboardContext();

  const icons: Record<SortOrder, JSX.Element> = {
    ASC: <ArrowUp size={14} />,
    DESC: <ArrowDown size={14} />,
  };

  const labels: Record<SortOrder, string> = {
    ASC: "ASC",
    DESC: "DESC",
  };

  const toggleSortOrder = () => {
    const newSortOrder = videosRequestBody.sortOrder === "ASC" ? "DESC" : "ASC";
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
