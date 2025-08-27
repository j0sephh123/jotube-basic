import { useTotalCounts } from "@features/Statistics";
import { Loader, PlayCircle } from "lucide-react";
import { IconButton } from "@shared/ui";
import { useScreenshotsForCarousel } from "@features/Screenshot";

export default function ViewGlobalScreenshots() {
  const viewScreenshots = useScreenshotsForCarousel();
  const { data: totalCounts, isLoading } = useTotalCounts();
  const totalScreenshots = totalCounts?.totalScreenshots;
  const screenshotCount = totalScreenshots ?? "N/A";

  return (
    <div className="relative">
      <IconButton
        icon={<PlayCircle />}
        tooltip={{ content: "View all screenshots", position: "bottom" }}
        onClick={() => viewScreenshots([])}
      />
      <span className="absolute -bottom-1 -right-1 text-xs bg-zinc-600 text-white rounded-full px-1 py-0 text-[10px] leading-tight min-w-4 text-center">
        {isLoading ? (
          <Loader className="w-2 h-2 animate-spin" />
        ) : (
          screenshotCount
        )}
      </span>
    </div>
  );
}
