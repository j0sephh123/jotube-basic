import { Button } from "@shared/ui";
import { useUploadsWithStoryboard } from "@features/Storyboard";
import { setStoryboardProcessingData } from "@features/Storyboard/model/storyboardStore";

type Props = {
  ytChannelId: string;
  storyboardArtifactsCount: number;
};

export default function ViewStoryboards({
  ytChannelId,
  storyboardArtifactsCount,
}: Props) {
  const { data: storyboardsData, refetch: getStoryboards } =
    useUploadsWithStoryboard();

  const handleClick = () => {
    if (storyboardsData) {
      setStoryboardProcessingData([
        {
          ytChannelId,
          uploads: storyboardsData,
        },
      ]);
    } else {
      // If no data, refetch to get the latest
      getStoryboards();
    }
  };

  return (
    <Button onClick={handleClick}>
      Storyboards ({storyboardArtifactsCount})
    </Button>
  );
}
