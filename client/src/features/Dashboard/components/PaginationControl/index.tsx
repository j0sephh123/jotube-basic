import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDashboardContext } from "../../hooks/useDashboardContext";
import getPaginationRange from "./getPaginationRange";
import Button from "@/shared/ui/button";

type PaginationControlProps = {
  total: number;
};

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
        <Button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="join-item btn btn-sm"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {paginationRange.map((item, index) =>
          item === "dots" ? (
            <Button
              key={`dots-${index}`}
              className="join-item btn btn-sm btn-disabled"
            >
              &hellip;
            </Button>
          ) : (
            <Button
              key={index}
              onClick={() => onPageChange(item as number)}
              className={`join-item btn btn-sm ${
                item === currentPage ? "btn-primary" : "btn-ghost"
              }`}
              aria-current={item === currentPage ? "page" : undefined}
            >
              {item}
            </Button>
          )
        )}

        <Button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="join-item btn btn-sm"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <span className="ml-4 text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}
