import { Button } from "@shared/ui";
import { useScreenshotsForCarousel } from "@features/Screenshot";

type Props = {
  ytChannelId: string;
  screenshotArtifactsCount: number;
};

export default function ViewScreenshots({
  ytChannelId,
  screenshotArtifactsCount,
}: Props) {
  const viewScreenshots = useScreenshotsForCarousel();
  const handleViewScreenshots = () => {
    viewScreenshots([ytChannelId]);
  };

  return (
    <Button onClick={handleViewScreenshots}>
      Screenshots ({screenshotArtifactsCount})
    </Button>
  );
}
