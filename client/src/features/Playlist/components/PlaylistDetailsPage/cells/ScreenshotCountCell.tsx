import { Channel } from "../../../types";
import TableCol from "../TableCol";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";
import { Camera } from "lucide-react";

type ScreenshotCountCellProps = {
  channel: Channel;
};

export default function ScreenshotCountCell({
  channel,
}: ScreenshotCountCellProps) {
  const count = channel.counts?.screenshotCount ?? 0;
  const { getScreenshots } = useArtifacts();

  const handleViewScreenshots = () => {
    getScreenshots([channel.ytId]);
  };

  return (
    <TableCol className="text-center w-[80px]">
      <div className="flex flex-col items-center gap-2">
        <span className="font-medium text-lg">{count}</span>
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
