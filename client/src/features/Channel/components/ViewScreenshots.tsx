import Button from "@/shared/components/button";
import useViewScreenshots from "@/features/Thumbnail/hooks/useViewScreenshots";

type Props = {
  ytChannelId: string;
  screenshotArtifactsCount: number;
};

export default function ViewScreenshots({
  ytChannelId,
  screenshotArtifactsCount,
}: Props) {
  const viewScreenshots = useViewScreenshots();
  const handleViewScreenshots = () => {
    viewScreenshots([ytChannelId]);
  };

  return (
    <Button onClick={handleViewScreenshots}>
      Screenshots ({screenshotArtifactsCount})
    </Button>
  );
}
