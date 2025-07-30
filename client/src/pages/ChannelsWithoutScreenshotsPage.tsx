import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import ChannelLink from "@/shared/components/ChannelLink";
import { useChannelsWithoutScreenshots } from "@/features/Channel/hooks/useChannelsWithoutScreenshots";
import { ChannelsWithoutScreenshotsResponse } from "@/features/Channel/hooks/useChannelsWithoutScreenshots";

// TODO to be refactored
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

function ChannelCard({
  channel,
}: {
  channel: ChannelsWithoutScreenshotsResponse["channels"][0];
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <ChannelLink ytId={channel.ytId} where="index">
      <div className="flex gap-4 p-2 rounded transition-colors relative border-2 border-gray-500/30 h-fit max-w-full w-full hover:bg-gray-700/50 cursor-pointer">
        {imageError ? (
          <div className="w-32 h-20 bg-gray-600 rounded ml-2 my-2 shrink-0 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No Image</span>
          </div>
        ) : (
          <img
            src={channel.src}
            alt={channel.title}
            className="w-32 h-20 object-cover rounded ml-2 my-2 shrink-0"
            onError={() => setImageError(true)}
          />
        )}
        <div className="w-[36%] flex flex-col justify-center gap-1 min-w-0">
          <h3 className="font-medium truncate block w-[95%] text-base leading-tight mb-0.5">
            {channel.title}
          </h3>
          <span className="text-xs text-gray-400">
            Created:{" "}
            <span className="font-semibold text-gray-200">
              {new Date(channel.createdAt).toLocaleDateString()}
            </span>
          </span>
        </div>
      </div>
    </ChannelLink>
  );
}

export default function ChannelsWithoutScreenshotsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const perPage = 20;
  const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";

  const { data } = useChannelsWithoutScreenshots({ page, perPage, sortOrder });

  const totalPages = data
    ? Math.ceil((data as ChannelsWithoutScreenshotsResponse).total / perPage)
    : 0;
  const paginationRange = getPaginationRange(page, totalPages, 1);

  const onPageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", newPage.toString());
      return next;
    });
  };

  const toggleSortOrder = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sortOrder", sortOrder === "asc" ? "desc" : "asc");
      return next;
    });
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[90vh]">
      <div className="flex-none flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <button className="btn" onClick={toggleSortOrder}>
            {sortOrder === "asc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
          </button>
          <span className="text-sm text-gray-400">
            {(data as ChannelsWithoutScreenshotsResponse).total} pristine
            channels
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
          {(data as ChannelsWithoutScreenshotsResponse).channels.map(
            (channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            )
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex-none flex items-center justify-center p-4 border-t border-gray-700 bg-base-100 sticky bottom-0">
          <div className="join">
            <button
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              disabled={page === 1}
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
                    item === page ? "btn-primary" : "btn-ghost"
                  }`}
                  aria-current={item === page ? "page" : undefined}
                >
                  {item}
                </button>
              )
            )}

            <button
              onClick={() => onPageChange(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
              className="join-item btn btn-sm"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <span className="ml-4 text-sm text-gray-400">
            Page {page} of {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}
