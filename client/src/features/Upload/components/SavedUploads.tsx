import {
  DeleteUpload,
  DownloadUpload,
  PublishedTimeAgo,
} from "@features/Upload";
import { type UploadsListQueryResult } from "@shared/api";
import { useQueue } from "@shared/hooks";
import { Card } from "@shared/ui";

export type SavedUploadsProps = {
  ytChannelId: string;
  handleSideEffect: () => void;
  data: UploadsListQueryResult["data"];
};

export default function SavedUploads({
  ytChannelId,
  handleSideEffect,
  data,
}: SavedUploadsProps) {
  const { data: queue } = useQueue();

  return (
    <>
      {data?.uploadsList?.uploads
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
