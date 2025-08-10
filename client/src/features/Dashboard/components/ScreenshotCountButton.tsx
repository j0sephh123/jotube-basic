import Button from "@/shared/button";
import { useStore } from "@/store/store";

type ScreenshotCountButtonProps = {
  screenshotCount: number;
  videoYtId: string;
  channelYtId: string;
};

export default function ScreenshotCountButton({
  screenshotCount,
  videoYtId,
  channelYtId,
}: ScreenshotCountButtonProps) {
  const { openSidePanel } = useStore();

  const handleClick = () => {
    if (screenshotCount > 0) {
      openSidePanel(videoYtId, channelYtId);
    }
  };

  return (
    <Button
      color="primary"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={screenshotCount === 0}
      className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-md transition-colors"
    >
      {screenshotCount}
    </Button>
  );
}
