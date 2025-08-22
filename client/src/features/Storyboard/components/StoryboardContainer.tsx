import { Loader } from "lucide-react";
import ErrorMessage from "@shared/ui/static/ErrorMessage";
import NoDataAvailable from "@shared/ui/static/NoDataAvailable";
import { UploadWithStoryboard } from "@/features/Storyboard/model/useUploadsWithStoryboard";
import useUploadsWithStoryboard from "@/features/Storyboard/model/useUploadsWithStoryboard";
import Header from "@features/Storyboard/components/Header";

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

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !uploadsWithStoryboard) {
    return <ErrorMessage message="Error loading storyboards" />;
  }

  if (uploadsWithStoryboard.length === 0) {
    return <NoDataAvailable message="No storyboards found" />;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <Header length={uploadsWithStoryboard.length} />
      </div>
      {children(uploadsWithStoryboard)}
    </>
  );
}
