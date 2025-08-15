import Button from "@/shared/button";
import { useGetUploadsWithStoryboards } from "./hooks";
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
  const { mutateAsync: getUploadsWithStoryboards } =
    useGetUploadsWithStoryboards();

  const handleClick = () => {
    getUploadsWithStoryboards(ytChannelId).then((r) =>
      setStoryboardProcessingData([
        {
          ytChannelId,
          uploads: r,
        },
      ])
    );
  };

  return (
    <Button onClick={handleClick}>
      Storyboards ({storyboardArtifactsCount})
    </Button>
  );
}
