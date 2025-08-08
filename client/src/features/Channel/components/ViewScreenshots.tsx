import Button from "@/shared/button";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";

type Props = {
  ytChannelId: string;
  screenshotArtifactsCount: number;
};

export default function ViewScreenshots({
  ytChannelId,
  screenshotArtifactsCount,
}: Props) {
  const { getScreenshots } = useArtifacts();
  const handleViewScreenshots = () => {
    getScreenshots([ytChannelId]);
  };

  return (
    <Button
      onClick={handleViewScreenshots}
      color="accent"
      variant="outline"
      size="sm"
    >
      Screenshots ({screenshotArtifactsCount})
    </Button>
  );
}
