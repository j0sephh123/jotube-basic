import Button from "@/shared/components/button";
import useUploadsWithStoryboard from "@/features/Storyboard/useUploadsWithStoryboard";
import { useStoryboardProcessing } from "@/store/store";

type Props = {
  ytChannelId: string;
  storyboardArtifactsCount: number;
};

export default function ViewStoryboards({
  ytChannelId,
  storyboardArtifactsCount,
}: Props) {
  const { setStoryboardProcessingData } = useStoryboardProcessing();
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
