import { ArrowUp, ArrowDown } from "lucide-react";
import { useDashboardContext } from "@/features/Dashboard/model/useDashboardContext";
import Button from "@shared/ui/button";
import { SortOrder } from "@/shared/api/generated/graphql";

export default function SelectSortDirection(): JSX.Element {
  const { requestBody, setRequestBody } = useDashboardContext();

  const icons: Record<SortOrder, JSX.Element> = {
    ASC: <ArrowUp size={14} />,
    DESC: <ArrowDown size={14} />,
  };

  const labels: Record<SortOrder, string> = {
    ASC: "ASC",
    DESC: "DESC",
  };

  const toggleSortOrder = () => {
    const newSortOrder =
      requestBody.sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
    setRequestBody("sortOrder", newSortOrder);
  };

  return (
    <Button onClick={toggleSortOrder}>
      {icons[requestBody.sortOrder as SortOrder]}
      <span className="ml-2">{labels[requestBody.sortOrder as SortOrder]}</span>
    </Button>
  );
}
