import { SortOrder } from "@/generated/graphql";

type TableHeaderProps = {
  children: React.ReactNode;
  sortField?:
    | "title"
    | "videoCount"
    | "savedCount"
    | "screenshotCount"
    | "thumbnailCount";
  sortDirection?: SortOrder;
  onSort?: (
    field:
      | "title"
      | "videoCount"
      | "savedCount"
      | "screenshotCount"
      | "thumbnailCount"
  ) => void;
};

export default function PlaylistTableHeader({
  children,
  sortField,
  sortDirection,
  onSort,
}: TableHeaderProps) {
  const SortableHeader = ({
    field,
    children: headerContent,
    className = "",
    style,
  }: {
    field:
      | "title"
      | "videoCount"
      | "savedCount"
      | "screenshotCount"
      | "thumbnailCount";
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }) => {
    const isSorted = sortField === field;
    const isAsc = sortDirection === SortOrder.Asc;

    return (
      <th
        className={`${className} cursor-pointer hover:bg-base-200 select-none ${
          isSorted ? "bg-base-200" : ""
        }`}
        style={style}
        onClick={() => onSort?.(field)}
      >
        <div className="flex items-center justify-center gap-2">
          {headerContent}
          <span
            className={`text-lg ${
              isSorted ? "text-primary" : "text-base-content/30"
            }`}
          >
            {isSorted ? (isAsc ? "↑" : "↓") : "↕"}
          </span>
        </div>
      </th>
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full table-fixed">
            <thead>
              <tr>
                <SortableHeader
                  field="title"
                  className="w-[200px] text-left text-xs"
                  style={{ width: "200px" }}
                >
                  Title
                </SortableHeader>
                <SortableHeader
                  field="videoCount"
                  className="w-[80px] text-center text-xs"
                  style={{ width: "80px" }}
                >
                  Defaults
                </SortableHeader>
                <SortableHeader
                  field="savedCount"
                  className="w-[80px] text-center text-xs"
                  style={{ width: "80px" }}
                >
                  Saved
                </SortableHeader>
                <SortableHeader
                  field="screenshotCount"
                  className="w-[80px] text-center text-xs"
                  style={{ width: "80px" }}
                >
                  Screens
                </SortableHeader>
                <SortableHeader
                  field="thumbnailCount"
                  className="w-[80px] text-center text-xs"
                  style={{ width: "80px" }}
                >
                  Thumbs
                </SortableHeader>
                <th
                  className="w-[80px] text-center text-xs"
                  style={{ width: "80px" }}
                >
                  Gallery
                </th>
                <th className="text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
