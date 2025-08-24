import { useDownload, useSavedUploads, DeleteUpload } from "@features/Upload";
import { useQueue } from "@shared/hooks";
import { Card } from "@shared/ui";
import { timeAgo } from "@shared/utils";

export default function SavedUploads({
  ytChannelId,
}: {
  ytChannelId: string;
}): JSX.Element {
  const { data: queue, refetch: refetchQueue } = useQueue();
  const handleDownloadMutation = useDownload();
  const { data: savedUploads, refetch: refetchSavedUploads } =
    useSavedUploads(ytChannelId);

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
      <div className="h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
          {savedUploads[0]?.channel?.uploads
            ?.filter((upload) => {
              const isDownloading = queue?.some(
                (item) => item.ytVideoId === upload.ytId
              );

              return !isDownloading;
            })
            .map((upload) => (
              <Card
                id={upload.id}
                src={upload.src}
                ytId={upload.ytId}
                title={upload.title}
                ytChannelId={ytChannelId}
                cardMenuSlot={<Card.Menu id={upload.id} ytId={upload.ytId} />}
                secondRow={
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {timeAgo(upload.publishedAt)}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">12:34</span>
                  </div>
                }
                actionButtonSlot={
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleDownload(upload.ytId)}
                    >
                      Download
                    </button>
                    <DeleteUpload
                      handleSideEffect={refetchSavedUploads}
                      ytChannelId={ytChannelId}
                      ytVideoIds={[upload.ytId]}
                    />
                  </div>
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}
