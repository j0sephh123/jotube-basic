import {
  DeleteUpload,
  PublishedTimeAgo,
  SaveUpload,
  DownloadStoryboard,
  DownloadUpload,
  VideoPlayer,
} from "@features/Upload";
import { type UploadsListQueryResult } from "@shared/api";
import { useQueue } from "@shared/hooks";
import { Card } from "@shared/ui";

export type UploadsListProps = {
  ytChannelId: string;
  handleSideEffect: () => void;
  data: UploadsListQueryResult["data"];
  type: "default" | "saved";
};

export default function UploadsList({
  ytChannelId,
  handleSideEffect,
  data,
  type,
}: UploadsListProps) {
  const { data: queue } = useQueue();

  const filteredUploads = data?.uploadsList?.uploads.filter((upload) => {
    if (type === "saved") {
      const isDownloading = queue?.some(
        (item) => item.ytVideoId === upload.ytId
      );
      return !isDownloading;
    }
    return true;
  });

  return (
    <>
      {filteredUploads?.map((upload) => (
        <Card.Container key={upload.id}>
          <div className="relative group">
            <VideoPlayer
              ytId={upload.ytId}
              src={upload.src}
              id={upload.id}
              title={upload.title}
              duration={upload.duration}
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <Card.Menu id={upload.id} ytId={upload.ytId} />
            </div>
          </div>
          <Card.Content>
            <Card.Title title={upload.title} onClick={() => {}} />
            <PublishedTimeAgo date={upload.publishedAt} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {type === "default" ? (
                  <>
                    <SaveUpload
                      ytVideoId={upload.ytId}
                      ytChannelId={ytChannelId}
                      handleSideEffect={handleSideEffect}
                    />
                    <DownloadStoryboard
                      ytVideoId={upload.ytId}
                      ytChannelId={ytChannelId}
                      handleSideEffect={handleSideEffect}
                    />
                  </>
                ) : (
                  <DownloadUpload
                    ytChannelId={ytChannelId}
                    handleSideEffect={handleSideEffect}
                    ytVideoId={upload.ytId}
                  />
                )}
                <DeleteUpload
                  handleSideEffect={handleSideEffect}
                  ytChannelId={ytChannelId}
                  ytVideoIds={[upload.ytId]}
                />
              </div>
            </div>
          </Card.Content>
        </Card.Container>
      ))}
    </>
  );
}
