import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import NoDataAvailable from "@/shared/components/static/NoDataAvailable";
import { StoryboardArtifact } from "../useStoryboards";

export default function StoryboardContainer({
  children,
  isLoading,
  isError,
  data,
}: {
  children: (data: StoryboardArtifact[]) => React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  data: StoryboardArtifact[] | undefined;
}) {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorMessage message="Error loading storyboards" />;
  }

  if (data.length === 0) {
    return <NoDataAvailable message="No storyboards found" />;
  }

  return <>{children(data)}</>;
}
