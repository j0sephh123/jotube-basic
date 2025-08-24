import {
  useSavedUploads,
  DeleteUpload,
  DownloadUpload,
  PublishedTimeAgo,
} from "@features/Upload";
import { useQueue } from "@shared/hooks";
import { Card } from "@shared/ui";

export type SavedUploadsProps = {
  ytChannelId: string;
  handleSideEffect: () => void;
};

export default function SavedUploads({
  ytChannelId,
  handleSideEffect,
}: SavedUploadsProps) {
  const { data: queue } = useQueue();
  const { data } = useSavedUploads(ytChannelId);

  return (
    <>
          {data?.[0]?.channel?.uploads
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
                secondRow={<PublishedTimeAgo date={upload.publishedAt} />}
                actionButtonSlot={
                  <div className="flex items-center gap-2">
                    <DownloadUpload
                      ytChannelId={ytChannelId}
                      handleSideEffect={handleSideEffect}
                      ytVideoId={upload.ytId}
                    />
                    <DeleteUpload
                      handleSideEffect={handleSideEffect}
                      ytChannelId={ytChannelId}
                      ytVideoIds={[upload.ytId]}
                    />
                  </div>
                }
              />
        ))}
    </>
  );
}
