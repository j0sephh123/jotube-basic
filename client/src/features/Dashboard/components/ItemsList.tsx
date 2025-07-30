import Item from "./Item";
import { DashboardItemListProps } from "./props";
import { useStore } from "@/store/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDashboardContext } from "./useDashboardContext";

type ItemsListProps = DashboardItemListProps & {
  onDownload?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ItemsList = ({ data, onDownload, onDelete }: ItemsListProps) => {
  const { viewType } = useParams();

  const isIgnored = useStore((state) => state.isIgnored);
  const {
    requestBody: { page },
    setRequestBody,
  } = useDashboardContext();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(data.total / 12);
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const handlePrevPage = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (canGoPrev) {
        setRequestBody("page", page - 1);
      }
    },
    [canGoPrev, page, setRequestBody]
  );

  const handleNextPage = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (canGoNext) {
        setRequestBody("page", page + 1);
      }
    },
    [canGoNext, page, setRequestBody]
  );

  if (!data.channels || !Array.isArray(data.channels)) {
    return <div>No channels data available</div>;
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 p-4 mb-10"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        role="grid"
      >
        {data.channels
          .filter((channel) => !isIgnored(channel.ytId))
          .map((channel) => (
            <Item
              {...channel}
              key={channel.id}
              ytChannelId={channel.ytId}
              viewType={viewType}
              onDownload={onDownload}
              onDelete={onDelete}
              screenshotsCount={channel.screenshotsCount}
              screenshots={channel.screenshots}
            />
          ))}

        {isHovered && canGoPrev && (
          <button
            onClick={handlePrevPage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-xl transition-all duration-200 opacity-100 border-2 border-white"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        {isHovered && canGoNext && (
          <button
            onClick={handleNextPage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-xl transition-all duration-200 opacity-100 border-2 border-white"
            aria-label="Next page"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>
    </>
  );
};

export default ItemsList;
