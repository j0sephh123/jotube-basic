import { useStore } from "@/store/store";

type Props = {
  pageInfo: string;
};

export default function Header({ pageInfo }: Props) {
  const { metadata, thumbnailsProcessingData } = useStore();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">
          Processing Thumbnails {thumbnailsProcessingData.length}
        </h2>
        <div className="ml-4 text-gray-300 text-sm">
          Channel: {metadata.ytChannelId}
        </div>
        <div className="text-gray-300 text-sm">Video: {metadata.ytVideoId}</div>
        <div className="text-gray-300 text-sm">{pageInfo}</div>
      </div>
    </div>
  );
}
