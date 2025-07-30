import { useChannelMetadataQuery } from "@/features/Channel/hooks/useChannelMetadata";
import useSyncUploads from "@/features/Upload/hooks/useSyncUploads";
import { useSearchParams, useLocation } from "react-router-dom";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";
import { useTypedChannelYtId } from "@/shared/hooks/useTypedParams";
import { SortOrder } from "@/shared/types/searchParams";
import ChannelMetadata from "./ChannelMetadata";
import ChannelActions from "./ChannelActions";
import ChannelControls from "./ChannelControls";

const ChannelsHeader = () => {
  const ytChannelId = useTypedChannelYtId();
  const { pathname } = useLocation();
  const isSavedPage = pathname.includes("/saved");
  const isIndexPage = pathname.length === 34;
  const { viewThumbnails, getScreenshots } = useArtifacts();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "desc") as SortOrder;
  const { data: metadata } = useChannelMetadataQuery(ytChannelId);

  const syncUploadsMutation = useSyncUploads(ytChannelId);

  const handleViewThumbnails = () => {
    if (!metadata?.id) return;
    viewThumbnails([metadata.id]);
  };

  const handleViewScreenshots = () => {
    getScreenshots([ytChannelId]);
  };

  const toggleSortOrder = () => {
    setSearchParams((prev) => {
      const newSort = prev.get("sort") === "asc" ? "desc" : "asc";
      prev.set("sort", newSort);
      return prev;
    });
  };

  const handleSync = () => {
    if (metadata?.id && ytChannelId) {
      syncUploadsMutation.mutate({
        channelId: metadata?.id,
        ytChannelId: ytChannelId,
      });
    }
  };

  return (
    <div className="bg-base-200 rounded-lg px-6 pt-16 shadow-md">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <ChannelMetadata 
            ytChannelId={ytChannelId}
            metadata={metadata}
            isSavedPage={isSavedPage}
            isIndexPage={isIndexPage}
          />
          
          <ChannelActions
            metadata={metadata}
            onViewThumbnails={handleViewThumbnails}
            onViewScreenshots={handleViewScreenshots}
          />
        </div>
        
        {!pathname.includes("/gallery") && !pathname.includes("/saved") && (
          <ChannelControls
            metadata={metadata}
            sortOrder={sortOrder}
            syncUploadsMutation={syncUploadsMutation}
            onToggleSortOrder={toggleSortOrder}
            onSync={handleSync}
          />
        )}
      </div>
    </div>
  );
};

export default ChannelsHeader; 