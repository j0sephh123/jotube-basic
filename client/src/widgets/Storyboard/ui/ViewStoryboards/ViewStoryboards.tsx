/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@shared/ui";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";

type Props = {
  channelId: number;
  storyboardArtifactsCount: number;
};

export default function ViewStoryboards({
  channelId,
  storyboardArtifactsCount,
}: Props) {
  const { mutateAsync: getStoryboards } = useGetUploadsWithStoryboards();

  const handleClick = () => {
    getStoryboards(channelId);
  };

  return (
    <Button onClick={handleClick}>
      Storyboards ({storyboardArtifactsCount})
    </Button>
  );
}
