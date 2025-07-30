import { useStore } from "@/store/store";
import { useFetchCarousel } from "@/features/Screenshot/hooks/useFetchCarousel";
import { useGetUploadsWithThumbnails } from "@/features/Thumbnail/hooks/useGetUploadsWithThumbnails";

export default function useThumbnails() {
  const { setThumbnailsProcessingData } = useStore();
  const fetchCarousel = useFetchCarousel();
  const { mutateAsync } = useGetUploadsWithThumbnails();

  const getScreenshots = (ytChannelIds: string[]) => {
    fetchCarousel(ytChannelIds);
  };

  const viewThumbnails = async (channelIds: number[]) => {
    const uploadsWithThumbnails = await mutateAsync(channelIds);

    setThumbnailsProcessingData(uploadsWithThumbnails);
  };

  return {
    getScreenshots,
    viewThumbnails,
  };
}
