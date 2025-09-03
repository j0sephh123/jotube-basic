/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@shared/ui";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";

type Props = {
  ytChannelId: string;
  storyboardArtifactsCount: number;
};

export default function ViewStoryboards({
  ytChannelId,
  storyboardArtifactsCount,
}: Props) {
  const { mutateAsync: getStoryboards } = useGetUploadsWithStoryboards();

  const handleClick = () => {
    getStoryboards(ytChannelId);
  };

  return (
    <Button onClick={handleClick}>
      Storyboards ({storyboardArtifactsCount})
    </Button>
  );
}
