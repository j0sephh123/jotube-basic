import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import NoDataAvailable from "@/shared/components/static/NoDataAvailable";
import { UploadWithStoryboard } from "../useUploadsWithStoryboard";
import useUploadsWithStoryboard from "../useUploadsWithStoryboard";
import Header from "./Header";

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
