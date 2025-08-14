import { useStoryboardProcessing } from "@/store/store";

export default function StoryboardProcessing() {
  const { storyboardProcessingData } = useStoryboardProcessing();

  if (storyboardProcessingData.ytVideoIds.length === 0) {
    return null;
  }

  return <div>StoryboardProcessing</div>;
}