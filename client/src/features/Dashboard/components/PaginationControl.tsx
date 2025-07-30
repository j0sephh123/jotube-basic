import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDashboardContext } from "./useDashboardContext";
import { PaginationControlProps } from "./props";

function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblings: number = 1
): (number | "dots")[] {
  const totalPageNumbers = siblings * 2 + 5;
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const leftSiblingIndex = Math.max(currentPage - siblings, 1);
  const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);
  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;
  let range: (number | "dots")[] = [];
  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 3 + 2 * siblings }, (_, i) => i + 1);
    range = [...leftRange, "dots", totalPages];
  } else if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblings },
      (_, i) => totalPages - (3 + 2 * siblings) + i + 1
    );
    range = [1, "dots", ...rightRange];
  } else if (showLeftDots && showRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    range = [1, "dots", ...middleRange, "dots", totalPages];
  }
  return range;
}

export default function PaginationControl({
  total,
}: PaginationControlProps): JSX.Element {
  const { requestBody, setRequestBody } = useDashboardContext();
  const totalPages = Math.ceil(total / 12);
  const currentPage = requestBody.page;
  const paginationRange = getPaginationRange(currentPage, totalPages, 1);

  const onPageChange = (page: number): void => {
    setRequestBody("page", page);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="join">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="join-item btn btn-sm"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {paginationRange.map((item, index) =>
          item === "dots" ? (
            <button
              key={`dots-${index}`}
              className="join-item btn btn-sm btn-disabled"
            >
              &hellip;
            </button>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(item as number)}
              className={`join-item btn btn-sm ${
                item === currentPage ? "btn-primary" : "btn-ghost"
              }`}
              aria-current={item === currentPage ? "page" : undefined}
            >
              {item}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="join-item btn btn-sm"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <span className="ml-4 text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}
