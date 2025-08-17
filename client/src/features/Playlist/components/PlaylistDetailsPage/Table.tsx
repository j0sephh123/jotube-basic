import { useState, useMemo } from "react";
import { PlaylistDetailsResponse } from "@/generated/graphql";
import { useRemoveFromPlaylist } from "./useRemoveFromPlaylist";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TitleCell from "./cells/TitleCell";
import VideoCountCell from "./cells/VideoCountCell";
import SavedCountCell from "./cells/SavedCountCell";
import ScreenshotCountCell from "./cells/ScreenshotCountCell";
import ThumbnailCountCell from "./cells/ThumbnailCountCell";
import GalleryCell from "./cells/GalleryCell";
import ActionsCell from "./cells/ActionsCell";
import { useRefetchPlaylist } from "../../hooks/useGetPlaylist";

type TableProps = {
  playlist: PlaylistDetailsResponse;
};

export default function Table({ playlist }: TableProps) {
  const { handleRemoveFromPlaylist, isPending } = useRemoveFromPlaylist();
  const refetchPlaylist = useRefetchPlaylist();
  const [sortField, setSortField] = useState<
    "title" | "videoCount" | "savedCount" | "screenshotCount" | "thumbnailCount"
  >("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedChannels = useMemo(() => {
    return [...playlist.channels].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "videoCount":
          aValue = a.videoCount || 0;
          bValue = b.videoCount || 0;
          break;
        case "savedCount":
          aValue = a.savedCount || 0;
          bValue = b.savedCount || 0;
          break;
        case "screenshotCount":
          aValue = a.screenshotCount || 0;
          bValue = b.screenshotCount || 0;
          break;
        case "thumbnailCount":
          aValue = a.thumbnailCount || 0;
          bValue = b.thumbnailCount || 0;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [playlist.channels, sortField, sortDirection]);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <TableHeader
      sortField={sortField}
      sortDirection={sortDirection}
      onSort={handleSort}
    >
      {sortedChannels.map((channel) => (
        <TableRow
          key={channel.id}
          cols={[
            <TitleCell channel={channel} refetchPlaylist={refetchPlaylist} />,
            <VideoCountCell channel={channel} />,
            <SavedCountCell channel={channel} />,
            <ScreenshotCountCell channel={channel} />,
            <ThumbnailCountCell channel={channel} />,
            <GalleryCell channel={channel} />,
            <ActionsCell
              channel={channel}
              onRemove={handleRemoveFromPlaylist}
              isRemoving={isPending}
            />,
          ]}
        />
      ))}
    </TableHeader>
  );
}
