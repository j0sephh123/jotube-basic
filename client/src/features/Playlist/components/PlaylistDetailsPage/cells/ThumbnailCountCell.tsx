import { Channel } from "../../../types";
import TableCol from "../TableCol";
import { ImageIcon } from "lucide-react";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";

type ThumbnailCountCellProps = {
  channel: Channel;
};

export default function ThumbnailCountCell({
  channel,
}: ThumbnailCountCellProps) {
  const count = channel.counts?.thumbnailCount ?? 0;

  const { viewThumbnails } = useArtifacts();
  const handleViewThumbnails = () => {
    viewThumbnails([channel.id]);
  };

  return (
    <TableCol className="text-center w-[80px]">
      <div className="flex flex-col items-center gap-2">
        <span className="font-medium text-lg">{count}</span>
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
