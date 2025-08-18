import { useState, useMemo } from "react";
import { PlaylistDetailsResponse, SortOrder } from "@/shared/api/generated/graphql";
import ActionsCell from "@/features/Playlist/components/PlaylistDetailsPage/cells/ActionsCell";
import GalleryCell from "@/features/Playlist/components/PlaylistDetailsPage/cells/GalleryCell";
import SavedCountCell from "@/features/Playlist/components/PlaylistDetailsPage/cells/SavedCountCell";
import ScreenshotCountCell from "@/features/Playlist/components/PlaylistDetailsPage/cells/ScreenshotCountCell";
import ThumbnailCountCell from "@/features/Playlist/components/PlaylistDetailsPage/cells/ThumbnailCountCell";
import VideoCountCell from "@/features/Playlist/components/PlaylistDetailsPage/cells/VideoCountCell";
import TableHeader from "@/entities/Playlist/ui/PlaylistTableHeader";
import TableRow from "@/entities/Playlist/ui/PlaylistTableRow";
import { useRemoveFromPlaylist } from "@/features/Playlist/components/PlaylistDetailsPage/useRemoveFromPlaylist";
import { useRefetchPlaylist } from "@/features/Playlist/hooks/useGetPlaylist";
import TitleCell from "./cells/TitleCell";

type TableProps = {
  playlist: PlaylistDetailsResponse;
};

export default function PlaylistTable({ playlist }: TableProps) {
  const { handleRemoveFromPlaylist, isPending } = useRemoveFromPlaylist();
  const refetchPlaylist = useRefetchPlaylist();
  const [sortField, setSortField] = useState<
    "title" | "videoCount" | "savedCount" | "screenshotCount" | "thumbnailCount"
  >("title");
  const [sortDirection, setSortDirection] = useState<SortOrder>(SortOrder.Asc);

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

      if (aValue < bValue) return sortDirection === SortOrder.Asc ? -1 : 1;
      if (aValue > bValue) return sortDirection === SortOrder.Asc ? 1 : -1;
      return 0;
    });
  }, [playlist.channels, sortField, sortDirection]);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(
        sortDirection === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc
      );
    } else {
      setSortField(field);
      setSortDirection(SortOrder.Asc);
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
