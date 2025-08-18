import { ImageIcon } from "lucide-react";
import useViewThumbnails from "@shared/hooks/useViewThumbnails";
import { PlaylistChannelWithCountsResponse } from "@/generated/graphql";
import TableCol from "@features/Playlist/components/PlaylistDetailsPage/TableCol";

type ThumbnailCountCellProps = {
  channel: PlaylistChannelWithCountsResponse;
};

export default function ThumbnailCountCell({
  channel,
}: ThumbnailCountCellProps) {
  const viewThumbnails = useViewThumbnails(channel.id);

  const handleViewThumbnails = () => {
    viewThumbnails();
  };

  return (
    <TableCol className="text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="font-medium text-lg">{channel.thumbnailCount}</span>
        <button
          onClick={handleViewThumbnails}
          className="p-1 hover:bg-base-200 rounded transition-colors"
          title="View thumbnails"
        >
          <ImageIcon className="w-4 h-4 text-base-content/60" />
        </button>
      </div>
    </TableCol>
  );
}
