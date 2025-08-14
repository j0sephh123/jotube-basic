import Button from "@/shared/button";

type Props = {
  storyboardArtifactsCount: number;
};

export default function ViewStoryboards({ storyboardArtifactsCount }: Props) {
  const handleClick = () => {
    
  }

  return <Button>Storyboards ({storyboardArtifactsCount})</Button>;
}