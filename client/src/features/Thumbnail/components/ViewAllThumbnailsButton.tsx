import { useGetUploadsWithThumbnails } from "@/features/Thumbnail/hooks/useGetUploadsWithThumbnails";
import { useGroupedThumbnails } from "@/features/Thumbnail/hooks/useGroupedThumbnails";
import { useStore } from "@/store/store";

export default function ViewAllThumbnailsButton() {
  const {
    data: { thumbnailChannelIds } = {
      thumbnailChannelIds: [],
      thumbnailChannels: [],
    },
  } = useGroupedThumbnails();
  const { setThumbnailsProcessingData } = useStore();
  const { mutateAsync: getUploadsWithThumbnailsMutation } =
    useGetUploadsWithThumbnails();

  const selectAllChannels = async (): Promise<void> => {
    const thumbnails = await getUploadsWithThumbnailsMutation(
      thumbnailChannelIds
    );
    setThumbnailsProcessingData(thumbnails);
  };

  return (
    <button className="btn btn-soft btn-primary" onClick={selectAllChannels}>
      View All Channels
    </button>
  );
}
