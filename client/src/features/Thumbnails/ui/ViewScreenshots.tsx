import { Button } from "@shared/ui";
import { useScreenshotsForCarousel } from "@features/Screenshot";

type Props = {
  channelId: number;
  screenshotArtifactsCount: number;
};

export default function ViewScreenshots({
  channelId,
  screenshotArtifactsCount,
}: Props) {
  const viewScreenshots = useScreenshotsForCarousel();
  const handleViewScreenshots = () => {
    viewScreenshots([channelId]);
  };

  return (
    <Button onClick={handleViewScreenshots}>
      Screenshots ({screenshotArtifactsCount})
    </Button>
  );
}
