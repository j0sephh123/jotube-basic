import { Button } from "@shared/ui";
import {
  type UploadWithStoryboard,
  useGetUploadsWithStoryboards,
} from "@features/Storyboard";
import { setStoryboardProcessingData } from "@features/Storyboard";

type Props = {
  ytChannelId: string;
  storyboardArtifactsCount: number;
};

export default function ViewStoryboards({
  ytChannelId,
  storyboardArtifactsCount,
}: Props) {
  const { data, mutateAsync: getStoryboards } = useGetUploadsWithStoryboards();

  const handleClick = () => {
    if (data) {
      setStoryboardProcessingData([
        {
          ytChannelId,
          uploads: data as unknown as UploadWithStoryboard[],
        },
      ]);
    } else {
      getStoryboards(ytChannelId);
    }
  };

  return (
    <Button onClick={handleClick}>
      Storyboards ({storyboardArtifactsCount})
    </Button>
  );
}
