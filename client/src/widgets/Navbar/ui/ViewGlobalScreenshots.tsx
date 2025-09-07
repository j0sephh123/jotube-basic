import { useTotalCounts } from "@features/Statistics";
import { PlayCircle } from "lucide-react";
import { IconButton } from "@shared/ui";
import { useScreenshotsForCarousel } from "@features/Screenshot";

export default function ViewGlobalScreenshots() {
  const viewScreenshots = useScreenshotsForCarousel();
  const { data: totalCounts, isLoading } = useTotalCounts();
  const totalScreenshots = totalCounts?.totalScreenshots;
  const screenshotCount = totalScreenshots ?? "N/A";

  return (
    <IconButton
      icon={<PlayCircle />}
      tooltip={{ content: "View all screenshots", position: "bottom" }}
      onClick={() => viewScreenshots([])}
      text="Screenshots"
      tip={isLoading ? undefined : Number(screenshotCount)}
    />
  );
}
