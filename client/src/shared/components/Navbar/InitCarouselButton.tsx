import { useTotalScreenshots } from "@/features/Screenshot/hooks/useTotalScreenshots";
import useThumbnails from "@/features/Thumbnail/hooks/useThumbnails";
import { Loader, PlayCircle } from "lucide-react";

export default function InitCarouselButton() {
  const { getScreenshots } = useThumbnails();
  const handleAllCarousel = () => getScreenshots([]);
  const { data: totalScreenshots, isLoading } = useTotalScreenshots();

  const screenshotCount = totalScreenshots ?? "N/A";
  const displayValue =
    typeof screenshotCount === "number"
      ? `${screenshotCount}`
      : screenshotCount;

  return (
    <button
      onClick={handleAllCarousel}
      className="btn btn-ghost text-xl relative"
    >
      <PlayCircle />
      <span className="absolute -bottom-1 -right-1 text-xs bg-zinc-600 text-white rounded-full px-1 py-0 text-[10px] leading-tight min-w-4 text-center">
        {isLoading ? <Loader className="w-2 h-2 animate-spin" /> : displayValue}
      </span>
    </button>
  );
}
