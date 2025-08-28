import { ArrowUp, ArrowDown } from "lucide-react";
import { useFinalSortOrder, type FinalSortOrder } from "@features/Dashboard";
import { Button } from "@shared/ui";

export default function SelectSortDirection(): JSX.Element {
  const { finalSortOrder, toggleSortOrder } = useFinalSortOrder();

  const icons: Record<FinalSortOrder, JSX.Element> = {
    asc: <ArrowUp size={14} />,
    desc: <ArrowDown size={14} />,
  };

  const labels: Record<FinalSortOrder, string> = {
    asc: "ASC",
    desc: "DESC",
  };

  return (
    <Button onClick={toggleSortOrder}>
      {icons[finalSortOrder]}
      <span className="ml-2">{labels[finalSortOrder]}</span>
    </Button>
  );
}
