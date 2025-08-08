import useDownload from "@/features/Upload/hooks/useDownload";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";
import { useQueue } from "@/shared/hooks/useQueue";
import { useSavedUploads } from "@/features/Upload/hooks/useSavedUploads";
import Card from "./Card";

export default function SavedUploads({
  ytChannelId,
}: {
  ytChannelId: string;
}): JSX.Element {
  const { data: queue, refetch: refetchQueue } = useQueue();
  const handleDownloadMutation = useDownload();
  const { data: savedUploads, refetch: refetchSavedUploads } =
    useSavedUploads(ytChannelId);
  const deleteUploadFromDbMutation = useDeleteUploads(refetchSavedUploads);

  if (!savedUploads || !savedUploads.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const handleDownload = (ytVideoId: string) => {
    handleDownloadMutation
      .mutateAsync([
        {
          ytChannelId,
          ytVideoIds: [ytVideoId],
        },
      ])
      .then(() => {
        refetchSavedUploads();
        refetchQueue();
      });
  };

  return (
    <div className="overflow-hidden">
      <div className={"h-[70vh] overflow-y-auto"}>
        <div
          className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2"}
        >
          {savedUploads[0]?.channel.uploads
            .filter((upload) => {
              const isDownloading = queue?.some(
                (item) => item.ytVideoId === upload.ytId
              );

              return !isDownloading;
            })
            .map((upload) => (
              <Card
                ytChannelId={ytChannelId}
                key={upload.id}
                item={upload}
                onSave={handleDownload}
                onDelete={() =>
                  deleteUploadFromDbMutation({
                    ytChannelId,
                    ytVideoIds: [upload.ytId],
                  })
                }
                actionButtonText="Download"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
