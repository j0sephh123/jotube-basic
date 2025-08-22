import { useState, useMemo } from "react";
import type {
  PlaylistDetailsResponse,
  PlaylistChannelWithCountsResponse,
} from "@shared/api";
import { SortOrder } from "@shared/api";
import PlaylistTableHeader from "./PlaylistTableHeader";
import PlaylistTableRow from "./PlaylistTableRow";
import TitleCell from "./TitleCell";

type TableProps = {
  playlist: PlaylistDetailsResponse;
  onRemoveFromPlaylist: (channelId: number) => void;
  isRemoving: boolean;
  refetchPlaylist: () => void;
  ActionsCell: React.ComponentType<{
    channel: PlaylistChannelWithCountsResponse;
    onRemove: (channelId: number) => void;
    isRemoving: boolean;
  }>;
  GalleryCell: React.ComponentType<{
    channel: PlaylistChannelWithCountsResponse;
  }>;
  SavedCountCell: React.ComponentType<{
    channel: PlaylistChannelWithCountsResponse;
  }>;
  ScreenshotCountCell: React.ComponentType<{
    channel: PlaylistChannelWithCountsResponse;
  }>;
  ThumbnailCountCell: React.ComponentType<{
    channel: PlaylistChannelWithCountsResponse;
  }>;
  VideoCountCell: React.ComponentType<{
    channel: PlaylistChannelWithCountsResponse;
  }>;
  SyncUploadsButton: React.ComponentType<{
    ytChannelId: string;
    id: number;
    onSuccess: () => void;
  }>;
};

export default function PlaylistTable({
  playlist,
  onRemoveFromPlaylist,
  isRemoving,
  refetchPlaylist,
  ActionsCell,
  GalleryCell,
  SavedCountCell,
  ScreenshotCountCell,
  ThumbnailCountCell,
  VideoCountCell,
  SyncUploadsButton,
}: TableProps) {
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
    <PlaylistTableHeader
      sortField={sortField}
      sortDirection={sortDirection}
      onSort={handleSort}
    >
      {sortedChannels.map((channel) => (
        <PlaylistTableRow
          key={channel.id}
          cols={[
            <TitleCell
              channel={channel}
              refetchPlaylist={refetchPlaylist}
              SyncUploadsButton={SyncUploadsButton}
            />,
            <VideoCountCell channel={channel} />,
            <SavedCountCell channel={channel} />,
            <ScreenshotCountCell channel={channel} />,
            <ThumbnailCountCell channel={channel} />,
            <GalleryCell channel={channel} />,
            <ActionsCell
              channel={channel}
              onRemove={onRemoveFromPlaylist}
              isRemoving={isRemoving}
            />,
          ]}
        />
      ))}
    </PlaylistTableHeader>
  );
}
