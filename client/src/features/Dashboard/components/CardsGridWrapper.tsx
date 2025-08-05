import { ReactNode } from "react";
import NoDataAvailable from "../../../shared/components/static/NoDataAvailable";
import Loading from "../../../shared/components/static/Loading";

type CardsGridWrapperProps = {
  children: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  className?: string;
  gridClassName?: string;
};

export default function CardsGridWrapper({
  children,
  isLoading = false,
  isEmpty = false,
  emptyMessage = "No data available",
  className = "",
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4",
}: CardsGridWrapperProps) {
  if (isLoading) {
    return <Loading />;
  }

  if (isEmpty) {
    return <NoDataAvailable message={emptyMessage} />;
  }

  return (
    <div className={`flex-1 flex flex-col overflow-scroll ${className}`}>
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className={gridClassName}>{children}</div>
      </div>
    </div>
  );
}
