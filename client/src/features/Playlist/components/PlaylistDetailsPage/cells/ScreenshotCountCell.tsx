import { Camera } from "lucide-react";
import useViewScreenshots from "@widgets/Thumbnails/lib/useViewScreenshots";
import { PlaylistChannelWithCountsResponse } from "@/generated/graphql";
import TableCol from "@/widgets/PlaylistDetails/ui/TableCol";

type ScreenshotCountCellProps = {
  channel: PlaylistChannelWithCountsResponse;
};

export default function ScreenshotCountCell({
  channel,
}: ScreenshotCountCellProps) {
  const viewScreenshots = useViewScreenshots();

  const handleViewScreenshots = () => {
    viewScreenshots([channel.ytId]);
  };

  return (
    <TableCol className="text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="font-medium text-lg">{channel.screenshotCount}</span>
        <button
          onClick={handleViewScreenshots}
          className="p-1 hover:bg-base-200 rounded transition-colors"
          title="View screenshots"
        >
          <Camera className="w-4 h-4 text-base-content/60" />
        </button>
      </div>
    </TableCol>
  );
}
