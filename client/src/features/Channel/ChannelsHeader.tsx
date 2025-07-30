import { useChannelMetadataQuery } from "@/features/Channel/hooks/useChannelMetadata";
import useSyncUploads from "@/features/Upload/hooks/useSyncUploads";
import { useSearchParams, useLocation } from "react-router-dom";
import useArtifacts from "@/features/Thumbnail/hooks/useThumbnails";
import { useTypedChannelYtId } from "@/shared/hooks/useTypedParams";
import ChannelLink from "@/shared/components/ChannelLink";
import OpenExplorerButton from "@/shared/components/OpenDirectoryButton/OpenDirectoryButton";
import CopyValue from "@/shared/components/CopyValue";
import clsx from "clsx";
import { formatLastSync } from "@/shared/utils/format";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";
import useAddUploadsToQueue from "@/features/Upload/hooks/useAddUploadsToQueue";
import useUploadsList from "@/features/Upload/hooks/useUploadsList";
import { useSaveUpload } from "@/features/Upload/hooks/useSaveUpload";
import { RotateCcw } from "lucide-react";
import { useStore } from "@/store/store";
import { RangePickerTypes } from "@/store/store-types";
import { useRefetchSavedUploads } from "@/features/Upload/hooks/useSavedUploads";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";
import { SortOrder } from "@/shared/types/searchParams";

const ChannelsHeader = () => {
  const ytChannelId = useTypedChannelYtId();
  const { pathname } = useLocation();
  const isSavedPage = pathname.includes("/saved");
  const isIndexPage = pathname.length === 34;
  const { viewThumbnails, getScreenshots } = useArtifacts();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "desc") as SortOrder;
  const { data: metadata } = useChannelMetadataQuery(ytChannelId);

  const location = useLocation();
  const { updateRangePickerValues } = useStore();

  const handleViewThumbnails = () => {
    if (!metadata?.id) return;
    viewThumbnails([metadata.id]);
  };
  const handleViewScreenshots = () => {
    getScreenshots([ytChannelId]);
  };

  const syncUploadsMutation = useSyncUploads(ytChannelId);
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchSavedUploads = useRefetchSavedUploads(ytChannelId);
  const toggleSortOrder = () => {
    setSearchParams((prev) => {
      const newSort = prev.get("sort") === "asc" ? "desc" : "asc";
      prev.set("sort", newSort);
      return prev;
    });
  };

  const handleResetRangeFilters = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("min");
      newParams.delete("max");
      newParams.delete("defaultMin");
      newParams.delete("defaultMax");
      return newParams;
    });

    const processedRangePicker = useStore
      .getState()
      .getRangePicker(RangePickerTypes.PROCESSED);
    const defaultsRangePicker = useStore
      .getState()
      .getRangePicker(RangePickerTypes.DEFAULTS);

    if (processedRangePicker) {
      updateRangePickerValues(RangePickerTypes.PROCESSED, [
        processedRangePicker.min,
        processedRangePicker.max,
      ]);
    }

    if (defaultsRangePicker) {
      updateRangePickerValues(RangePickerTypes.DEFAULTS, [
        defaultsRangePicker.min,
        defaultsRangePicker.max,
      ]);
    }
  };

  const isActiveRoute = (where: "index" | "saved" | "gallery") => {
    const path = `/channels/${ytChannelId}${
      where === "index" ? "" : `/${where}`
    }`;
    return location.pathname === path;
  };

  const downloadMutation = useAddUploadsToQueue();
  const { data: channelData } = useUploadsList(ytChannelId, sortOrder);
  const saveUploadMutation = useSaveUpload(() => {
    refetchChannelMetadata(ytChannelId);
    refetchSavedUploads();
  });

  const handleDownloadAll = () => {
    downloadMutation.mutate([{ ytChannelId, downloadOption: 0 }]);
  };

  const handleSaveAll = () => {
    if (!channelData?.uploads) return;

    const uploadsToSave = channelData.uploads
      .filter(
        (upload) =>
          upload.artifact !== "SAVED" && upload.artifact !== "DOWNLOADED"
      )
      .map((upload) => ({
        ytVideoId: upload.ytId,
        ytChannelId: ytChannelId,
      }));

    if (uploadsToSave.length > 0) {
      saveUploadMutation({ uploads: uploadsToSave });
    }
  };

  const deleteUploadsMutation = useDeleteUploads(() => {
    refetchSavedUploads();
    refetchChannelMetadata(ytChannelId);
  });

  const handleRemoveAll = () => {
    deleteUploadsMutation({
      ytChannelId,
      ytVideoIds: [],
    });
  };

  return (
    <div className="bg-base-200 rounded-lg px-6 pt-16 shadow-md">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ChannelLink ytId={ytChannelId} where="saved">
                <h2 className="text-xl font-bold pr-4">{metadata?.title}</h2>
              </ChannelLink>
              <CopyValue type="youtube" value={ytChannelId} />
              <OpenExplorerButton ytChannelId={ytChannelId} />
            </div>
            <div className="flex flex-wrap gap-2">
              <ChannelLink ytId={ytChannelId} where="index">
                <button
                  className={clsx("btn btn-sm", {
                    "btn-primary": isActiveRoute("index"),
                    "btn-ghost": !isActiveRoute("index"),
                  })}
                >
                  Uploads: {metadata?.videoArtifactsCount}
                </button>
              </ChannelLink>
              <ChannelLink ytId={ytChannelId} where="saved">
                <button
                  className={clsx("btn btn-sm", {
                    "btn-primary": isActiveRoute("saved"),
                    "btn-ghost": !isActiveRoute("saved"),
                  })}
                >
                  Saved: {metadata?.savedArtifactsCount}
                </button>
              </ChannelLink>
              <ChannelLink ytId={ytChannelId} where="gallery">
                <button
                  className={clsx("btn btn-sm", {
                    "btn-primary": isActiveRoute("gallery"),
                    "btn-ghost": !isActiveRoute("gallery"),
                  })}
                >
                  Gallery: {metadata?.screenshotArtifactsCount}
                </button>
              </ChannelLink>
              <div className="flex gap-2">
                {isSavedPage && (
                  <button
                    onClick={handleDownloadAll}
                    className="btn btn-primary"
                  >
                    Download All
                  </button>
                )}
                {isIndexPage && (
                  <button onClick={handleSaveAll} className="btn btn-success">
                    Save All
                  </button>
                )}
                {isSavedPage && (
                  <button onClick={handleRemoveAll} className="btn btn-error">
                    Remove All
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleViewThumbnails}
              className="btn btn-sm btn-outline"
            >
              <span className="flex items-center gap-1">
                Thumbnails ({metadata?.thumbnailArtifactsCount})
              </span>
            </button>
            <button
              onClick={handleViewScreenshots}
              className="btn btn-sm btn-outline"
            >
              <span className="flex items-center gap-1">
                Screenshots ({metadata?.screenshotArtifactsCount})
              </span>
            </button>
          </div>
        </div>
        {!pathname.includes("/gallery") && !pathname.includes("/saved") && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  className={clsx("btn btn-primary btn-sm", {
                    "btn-disabled": syncUploadsMutation.isPending,
                  })}
                  onClick={() => {
                    if (metadata?.id && ytChannelId) {
                      syncUploadsMutation.mutate({
                        channelId: metadata?.id,
                        ytChannelId: ytChannelId,
                      });
                    }
                  }}
                >
                  Sync
                  {syncUploadsMutation.isPending && (
                    <span className="loading loading-spinner loading-xs" />
                  )}
                </button>
                <span className="text-sm text-gray-400">
                  {formatLastSync(metadata?.lastSyncedAt ?? null)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="btn btn-outline btn-sm"
                onClick={toggleSortOrder}
              >
                Sort:
                {sortOrder === "asc" ? "↑ Oldest first" : "↓ Newest first"}
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleResetRangeFilters}
                title="Reset range filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelsHeader;
