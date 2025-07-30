import { ArrowUp, ArrowDown } from "lucide-react";
import { useDashboardContext } from "../../hooks/useDashboardContext";

export default function SelectSortDirection(): JSX.Element {
  const { requestBody, setRequestBody } = useDashboardContext();

  const icons: Record<"asc" | "desc", JSX.Element> = {
    asc: <ArrowUp size={14} />,
    desc: <ArrowDown size={14} />,
  };

  const labels: Record<"asc" | "desc", string> = {
    asc: "ASC",
    desc: "DESC",
  };

  const toggleSortOrder = () => {
    const newSortOrder = requestBody.sortOrder === "asc" ? "desc" : "asc";
    setRequestBody("sortOrder", newSortOrder);
  };

  return (
    <button onClick={toggleSortOrder} className="btn">
      {icons[requestBody.sortOrder as "asc" | "desc"]}
      <span className="ml-2">
        {labels[requestBody.sortOrder as "asc" | "desc"]}
      </span>
    </button>
  );
}
