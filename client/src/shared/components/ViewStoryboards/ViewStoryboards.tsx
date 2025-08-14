import Button from "@/shared/button";
import { useGetUploadsWithStoryboards } from "./hooks";

type Props = {
  ytChannelId: string;
  storyboardArtifactsCount: number;
};

export default function ViewStoryboards({
  ytChannelId,
  storyboardArtifactsCount,
}: Props) {
  const { mutateAsync: getUploadsWithStoryboards } =
    useGetUploadsWithStoryboards();

  const handleClick = () => {
    getUploadsWithStoryboards(ytChannelId).then((r) => console.log(r));
  };

  return (
    <Button onClick={handleClick}>
      Storyboards ({storyboardArtifactsCount})
    </Button>
  );
}
