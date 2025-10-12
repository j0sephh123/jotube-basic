import { ChannelsDashboardContainer } from "@widgets/Dashboard";
import { useParams, useSearchParams } from "react-router-dom";
import { type ViewType } from "@features/Dashboard";
import ChannelTableRow from "@widgets/ChannelTableRow";
import { useState, useMemo, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { DashboardChannelResponse } from "@shared/api";
import { useChannelsYearMonthCounts } from "@features/Dashboard/hooks/useChannelsYearMonthCounts";
import { YearMonthFilter } from "@features/Dashboard/components/YearMonthFilter";

type SortField =
  | "defaults"
  | "saved"
  | "screenshotsCount"
  | "storyboard"
  | "thumbnails";
type SortDirection = "asc" | "desc" | null;

function ChannelsTable({
  channels,
  refetch,
  viewType,
}: {
  channels: DashboardChannelResponse[];
  refetch: () => void;
  viewType: string;
}) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "desc") {
        setSortDirection("asc");
      } else if (sortDirection === "asc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field: SortField) => {
    const isActive = sortField === field;
    const isDesc = isActive && sortDirection === "desc";
    const isAsc = isActive && sortDirection === "asc";

    return (
      <div className="flex flex-col">
        <ChevronUp
          className={`w-4 h-4 ${isAsc ? "text-primary" : "opacity-30"}`}
        />
        <ChevronDown
          className={`w-4 h-4 ${isDesc ? "text-primary" : "opacity-30"}`}
        />
      </div>
    );
  };

  const sortedChannels = useMemo(() => {
    if (!sortField || !sortDirection || !channels) return channels;

    return [...channels].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === "desc") {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });
  }, [channels, sortField, sortDirection]);

  return (
    <div className="max-h-[calc(100vh-200px)] overflow-auto">
      <table className="table table-zebra w-full">
        <thead className="sticky top-0 bg-base-100 z-10 shadow-sm">
          <tr>
            <th className="bg-base-100">Channel</th>
            <th
              className="bg-base-100 cursor-pointer hover:bg-base-200 transition-colors"
              onClick={() => handleSort("defaults")}
            >
              <div className="flex items-center gap-1">
                Default
                {getSortIcon("defaults")}
              </div>
            </th>
            <th
              className="bg-base-100 cursor-pointer hover:bg-base-200 transition-colors"
              onClick={() => handleSort("saved")}
            >
              <div className="flex items-center gap-1">
                Saved
                {getSortIcon("saved")}
              </div>
            </th>
            <th
              className="bg-base-100 cursor-pointer hover:bg-base-200 transition-colors"
              onClick={() => handleSort("screenshotsCount")}
            >
              <div className="flex items-center gap-1">
                Screenshots
                {getSortIcon("screenshotsCount")}
              </div>
            </th>
            <th
              className="bg-base-100 cursor-pointer hover:bg-base-200 transition-colors"
              onClick={() => handleSort("storyboard")}
            >
              <div className="flex items-center gap-1">
                Storyboards
                {getSortIcon("storyboard")}
              </div>
            </th>
            <th
              className="bg-base-100 cursor-pointer hover:bg-base-200 transition-colors"
              onClick={() => handleSort("thumbnails")}
            >
              <div className="flex items-center gap-1">
                Thumbnails
                {getSortIcon("thumbnails")}
              </div>
            </th>
            <th className="bg-base-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedChannels?.map((channel) => (
            <ChannelTableRow
              key={channel.id}
              id={channel.id}
              ytId={channel.ytId}
              title={channel.title}
              src={channel.src}
              lastSyncedAt={channel.lastSyncedAt}
              screenshotsCount={channel.screenshotsCount}
              thumbnails={channel.thumbnails}
              saved={channel.saved}
              defaults={channel.defaults}
              storyboard={channel.storyboard}
              createdAt={channel.createdAt}
              videoCount={channel.videoCount}
              playlist={channel.playlist}
              featuredScreenshots={channel.featuredScreenshots}
              onChannelDelete={refetch}
              onSyncUploads={refetch}
              showPlaylistColumn={false}
              viewType={viewType as unknown as ViewType}
            />
          )) || []}
        </tbody>
      </table>
    </div>
  );
}

export default function ChannelsDashboard() {
  const { viewType } = useParams<{ viewType: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedYearMonth, setSelectedYearMonth] = useState<{
    year: number;
    month: number;
  } | null>(null);

  const { yearMonthCounts } = useChannelsYearMonthCounts(viewType || "");

  useEffect(() => {
    const urlYear = searchParams.get("year");
    const urlMonth = searchParams.get("month");

    if (urlYear && urlMonth) {
      setSelectedYearMonth({
        year: parseInt(urlYear),
        month: parseInt(urlMonth),
      });
    } else if (yearMonthCounts.length > 0 && selectedYearMonth === null) {
      const mostRecent = yearMonthCounts[0];
      if (mostRecent) {
        setSelectedYearMonth({
          year: mostRecent.year,
          month: mostRecent.month,
        });
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("year", mostRecent.year.toString());
          newParams.set("month", mostRecent.month.toString());
          return newParams;
        });
      }
    }
  }, [yearMonthCounts, selectedYearMonth, setSearchParams, searchParams]);

  const handleYearMonthChange = (
    yearMonth: { year: number; month: number } | null
  ) => {
    setSelectedYearMonth(yearMonth);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (yearMonth) {
        newParams.set("year", yearMonth.year.toString());
        newParams.set("month", yearMonth.month.toString());
      } else {
        newParams.delete("year");
        newParams.delete("month");
      }
      return newParams;
    });
  };

  return (
    <ChannelsDashboardContainer>
      {(channels, refetch) => (
        <>
          {viewType === "no-uploads" && (
            <YearMonthFilter
              yearMonthCounts={yearMonthCounts}
              selectedYearMonth={selectedYearMonth}
              onYearMonthChange={handleYearMonthChange}
            />
          )}
          <ChannelsTable
            channels={channels || []}
            refetch={refetch}
            viewType={viewType as unknown as ViewType}
          />
        </>
      )}
    </ChannelsDashboardContainer>
  );
}
