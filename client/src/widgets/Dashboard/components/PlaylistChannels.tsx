import { PlaylistDetailsContainer } from "@widgets/PlaylistDetails";
import ChannelTableRow from "@widgets/ChannelTableRow";
import { useState } from "react";
import { ChevronUp, ChevronDown, X, Camera } from "lucide-react";
import { useCreateStoryboard } from "@features/Upload";

type SortField =
  | "videoCount"
  | "saved"
  | "screenshotCount"
  | "storyboardCount"
  | "thumbnailCount";
type SortDirection = "asc" | "desc" | null;

export const PlaylistChannels = () => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const { mutateAsync: createStoryboards, isPending } = useCreateStoryboard();

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

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = (channels: { id: number }[]) => {
    const allIds = new Set(channels.map((channel) => channel.id));
    const isAllSelected =
      channels.length > 0 && selectedIds.size === channels.length;

    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(allIds);
    }
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkStoryboards = async (
    channels: { id: number; ytId: string }[]
  ) => {
    if (selectedIds.size === 0) return;

    const selectedChannels = channels.filter((channel) =>
      selectedIds.has(channel.id)
    );
    const ytChannelIds = selectedChannels.map((channel) => channel.ytId);

    await createStoryboards({
      ids: ytChannelIds,
      resourceType: "channel",
    });

    setSelectedIds(new Set());
  };

  return (
    <PlaylistDetailsContainer>
      {(playlist, refetch) => {
        const sortedChannels = (() => {
          if (!sortField || !sortDirection || !playlist?.channels)
            return playlist?.channels;

          return [...playlist.channels].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortDirection === "desc") {
              return bValue - aValue;
            } else {
              return aValue - bValue;
            }
          });
        })();

        return (
          <div className="space-y-4">
            <div className="max-h-[calc(100vh-200px)] overflow-auto">
              <table className="table w-full">
                <thead className="sticky top-0 bg-base-100 z-10 shadow-sm">
                  <tr>
                    <th className="bg-base-100">
                      <label className="cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checkbox-primary"
                          checked={
                            sortedChannels?.length > 0 &&
                            selectedIds.size === sortedChannels.length
                          }
                          onChange={() => handleSelectAll(sortedChannels || [])}
                        />
                      </label>
                    </th>
                    <th className="bg-base-100">Channel</th>
                    <th
                      className="bg-base-100 cursor-pointer hover:bg-base-200 transition-colors"
                      onClick={() => handleSort("videoCount")}
                    >
                      <div className="flex items-center gap-1">
                        Default
                        {getSortIcon("videoCount")}
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
                      onClick={() => handleSort("screenshotCount")}
                    >
                      <div className="flex items-center gap-1">
                        Screenshots
                        {getSortIcon("screenshotCount")}
                      </div>
                    </th>
                    <th
                      className="bg-base-100 cursor-pointer hover:bg-base-200 transition-colors"
                      onClick={() => handleSort("storyboardCount")}
                    >
                      <div className="flex items-center gap-1">
                        Storyboards
                        {getSortIcon("storyboardCount")}
                      </div>
                    </th>
                    <th
                      className="bg-base-100 cursor-pointer hover:bg-base-200 transition-colors"
                      onClick={() => handleSort("thumbnailCount")}
                    >
                      <div className="flex items-center gap-1">
                        Thumbnails
                        {getSortIcon("thumbnailCount")}
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
                      screenshotsCount={channel.screenshotCount}
                      thumbnails={channel.thumbnailCount}
                      saved={channel.saved}
                      defaults={channel.videoCount}
                      storyboard={channel.storyboardCount}
                      createdAt=""
                      videoCount={channel.videoCount}
                      featuredScreenshots={channel.featuredScreenshots}
                      onSyncUploads={refetch}
                      showPlaylistColumn={false}
                      playlist={{ id: playlist.id, name: playlist.name }}
                      hidePlaylistName={true}
                      viewType="thumbnails"
                      isSelected={selectedIds.has(channel.id)}
                      onToggleSelect={() => handleToggleSelect(channel.id)}
                    />
                  )) || []}
                </tbody>
              </table>
            </div>
            {selectedIds.size > 0 && (
              <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 bg-base-200 border border-base-300 shadow-lg backdrop-blur-sm z-50 rounded-t-lg">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="badge badge-primary badge-lg">
                      {selectedIds.size} selected
                    </span>
                    <span className="text-sm text-base-content/70">
                      {selectedIds.size === 1 ? "channel" : "channels"} selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        handleBulkStoryboards(sortedChannels || [])
                      }
                      disabled={isPending}
                    >
                      <Camera className="w-4 h-4" />
                      {isPending ? "Processing..." : "Capture Storyboards"}
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={handleClearSelection}
                    >
                      <X className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </PlaylistDetailsContainer>
  );
};
