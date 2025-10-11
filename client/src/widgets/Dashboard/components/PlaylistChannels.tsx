import { PlaylistDetailsContainer } from "@widgets/PlaylistDetails";
import ChannelTableRow from "@widgets/ChannelTableRow";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

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
                    />
                  )) || []}
                </tbody>
              </table>
            </div>
          </div>
        );
      }}
    </PlaylistDetailsContainer>
  );
};
