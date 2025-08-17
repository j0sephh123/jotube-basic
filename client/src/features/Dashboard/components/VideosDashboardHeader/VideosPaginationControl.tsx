import { ChevronLeft, ChevronRight } from "lucide-react";
import { useVideosDashboardContext } from "../../hooks/useVideosDashboardContext";
import getPaginationRange from "../PaginationControl/getPaginationRange";
import Button from "@/shared/ui/button";

type VideosPaginationControlProps = {
  total: number;
};

export default function VideosPaginationControl({
  total,
}: VideosPaginationControlProps): JSX.Element {
  const { videosRequestBody, setVideosRequestBody } =
    useVideosDashboardContext();
  const totalPages = Math.ceil(total / 12);
  const currentPage = videosRequestBody.page;
  const paginationRange = getPaginationRange(currentPage, totalPages, 1);

  const onPageChange = (page: number): void => {
    setVideosRequestBody("page", page);
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
