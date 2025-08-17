import { useTotalCounts } from "@/features/Statistics/hooks/useTotalCounts";
import useViewScreenshots from "@/features/Thumbnail/hooks/useViewScreenshots";
import { Loader, PlayCircle } from "lucide-react";
import IconButton from "@/shared/components/icons/IconButton";

export default function InitCarouselButton() {
  const viewScreenshots = useViewScreenshots();
  const handleAllCarousel = () => viewScreenshots([]);
  const { data: totalCounts, isLoading } = useTotalCounts();
  const totalScreenshots = totalCounts?.totalScreenshots;

  const screenshotCount = totalScreenshots ?? "N/A";
  const displayValue =
    typeof screenshotCount === "number"
      ? `${screenshotCount}`
      : screenshotCount;

  return (
    <div className="relative">
      <IconButton
        icon={<PlayCircle />}
        tooltip={{ content: "View all screenshots", position: "bottom" }}
        onClick={handleAllCarousel}
      />
      <span className="absolute -bottom-1 -right-1 text-xs bg-zinc-600 text-white rounded-full px-1 py-0 text-[10px] leading-tight min-w-4 text-center">
        {isLoading ? <Loader className="w-2 h-2 animate-spin" /> : displayValue}
      </span>
    </div>
  );
}
