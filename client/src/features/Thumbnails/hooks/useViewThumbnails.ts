import { useGetUploadsWithThumbnails } from "@features/Thumbnails";
import { type UploadsWithThumbnailsInput } from "@shared/api";
import { setProcessingData } from "@shared/store";

export default function useViewThumbnails(input: UploadsWithThumbnailsInput) {
  const getUploadsWithThumbnails = useGetUploadsWithThumbnails();

  return async () => {
    const thumbnails = await getUploadsWithThumbnails.mutateAsync(input);
    setProcessingData("thumbnails", thumbnails);
  };
}
