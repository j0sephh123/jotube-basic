import { ArrowUp, ArrowDown } from "lucide-react";
import { useDashboardContext } from "../../hooks/useDashboardContext";
import { SortOrder } from "@/shared/types/searchParams";
import Button from "@/shared/ui/button";

export default function SelectSortDirection(): JSX.Element {
  const { requestBody, setRequestBody } = useDashboardContext();

  const icons: Record<SortOrder, JSX.Element> = {
    asc: <ArrowUp size={14} />,
    desc: <ArrowDown size={14} />,
  };

  const labels: Record<SortOrder, string> = {
    asc: "ASC",
    desc: "DESC",
  };

  const toggleSortOrder = () => {
    const newSortOrder = requestBody.sortOrder === "asc" ? "desc" : "asc";
    setRequestBody("sortOrder", newSortOrder);
  };

  return (
    <Button onClick={toggleSortOrder}>
      {icons[requestBody.sortOrder as SortOrder]}
      <span className="ml-2">{labels[requestBody.sortOrder as SortOrder]}</span>
    </Button>
  );
}
