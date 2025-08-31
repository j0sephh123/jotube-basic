import { StaticStates } from "@shared/ui";
import type { UploadWithStoryboard } from "@features/Storyboard";
import { useUploadsWithStoryboard } from "@features/Storyboard";

export default function StoryboardContainer({
  children,
}: {
  children: (data: UploadWithStoryboard[]) => React.ReactNode;
}) {
  const {
    data: uploadsWithStoryboard,
    isLoading,
    error,
  } = useUploadsWithStoryboard();

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={uploadsWithStoryboard?.length === 0}
    >
      {children(uploadsWithStoryboard || [])}
    </StaticStates>
  );
}
