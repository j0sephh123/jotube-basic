import { useState, useMemo } from "react";
import { Playlist } from "../../types";
import { useRemoveFromPlaylist } from "./useRemoveFromPlaylist";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TitleCell from "./cells/TitleCell";
import VideoCountCell from "./cells/VideoCountCell";
import SavedCountCell from "./cells/SavedCountCell";
import ScreenshotCountCell from "./cells/ScreenshotCountCell";
import ThumbnailCountCell from "./cells/ThumbnailCountCell";
import StoryboardCountCell from "./cells/StoryboardCountCell";
import GalleryCell from "./cells/GalleryCell";
import ActionsCell from "./cells/ActionsCell";

type TableProps = {
  playlist: Playlist;
};

export default function Table({ playlist }: TableProps) {
  const { handleRemoveFromPlaylist, isPending } = useRemoveFromPlaylist();
  const [sortField, setSortField] = useState<
    | "title"
    | "videoCount"
    | "savedCount"
    | "screenshotCount"
    | "thumbnailCount"
    | "storyboardCount"
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
          aValue = a.counts?.videoCount || 0;
          bValue = b.counts?.videoCount || 0;
          break;
        case "savedCount":
          aValue = a.counts?.savedCount || 0;
          bValue = b.counts?.savedCount || 0;
          break;
        case "screenshotCount":
          aValue = a.counts?.screenshotCount || 0;
          bValue = b.counts?.screenshotCount || 0;
          break;
        case "thumbnailCount":
          aValue = a.counts?.thumbnailCount || 0;
          bValue = b.counts?.thumbnailCount || 0;
          break;
        case "storyboardCount":
          aValue = a.counts?.storyboardCount || 0;
          bValue = b.counts?.storyboardCount || 0;
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
            <TitleCell channel={channel} />,
            <VideoCountCell channel={channel} />,
            <SavedCountCell channel={channel} />,
            <ScreenshotCountCell channel={channel} />,
            <ThumbnailCountCell channel={channel} />,
            <StoryboardCountCell channel={channel} />,
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
