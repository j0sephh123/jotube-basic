import { useStore } from "@/store/store";
import Avatar from "@/shared/components/Avatar";
import { useGetUploadsWithThumbnails } from "@/features/Thumbnail/hooks/useGetUploadsWithThumbnails";
import { useGroupedThumbnails } from "@/features/Thumbnail/hooks/useGroupedThumbnails";
import { useNavigate } from "react-router-dom";
import ViewAllThumbnailsButton from "@/features/Thumbnail/components/ViewAllThumbnailsButton";
import { routes } from "@/shared/utils/routes";

export default function ThumbnailsPage() {
  const {
    data: { thumbnailChannels } = {
      thumbnailChannels: [],
    },
  } = useGroupedThumbnails();
  const navigate = useNavigate();
  const { setThumbnailsProcessingData } = useStore();
  const { mutateAsync: getUploadsWithThumbnailsMutation } =
    useGetUploadsWithThumbnails();

  const sortedChannels = [...thumbnailChannels].sort((a, b) => {
    return b.uploadsCount - a.uploadsCount;
  });

  return (
    <div className="fixed inset-0 flex flex-col mt-32">
      <div className="flex-none px-4 border-b border-gray-700 bg-base-100">
        <div className="flex justify-between items-center mb-4">
          <div className="text-base font-medium tracking-wide">
            Channels with thumbnails
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-base-100">
        <div className="grid grid-cols-6 gap-4">
          {sortedChannels.map((channel) => (
            <div
              key={channel.id}
              className="border border-gray-700 cursor-pointer p-2 rounded-md group relative"
            >
              <div className="flex flex-col items-center w-full">
                <div
                  className="w-full aspect-square mb-2 relative cursor-pointer"
                  onClick={async () => {
                    const thumbnails = await getUploadsWithThumbnailsMutation([
                      channel.id,
                    ]);
                    setThumbnailsProcessingData(thumbnails);
                  }}
                >
                  <Avatar
                    ytId={channel.ytId}
                    id={channel.id}
                    src={channel.src}
                    className="w-full h-full object-cover rounded-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  />
                </div>
                <div className="text-center w-full">
                  <div
                    onClick={() => {
                      navigate(routes.channel(channel.ytId));
                    }}
                    className="font-medium text-sm truncate"
                  >
                    {channel.title || "Untitled"}
                  </div>
                  <div className="text-xs opacity-60">
                    {channel.uploadsCount}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-none p-4 border-t border-gray-700 bg-base-100 flex justify-center">
        <ViewAllThumbnailsButton />
      </div>
    </div>
  );
}
