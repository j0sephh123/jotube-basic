import {
  VideoPlayer,
  DeleteUpload,
  PublishedTimeAgo,
  SaveUpload,
  DownloadStoryboard,
} from "@features/Upload";
import { useDefaultUploads } from "@features/Upload";
import { Card } from "@shared/ui";

export type DefaultUploadsProps = {
  ytChannelId: string;
  handleSideEffect: () => void;
};

export default function DefaultUploads({
  ytChannelId,
  handleSideEffect,
}: DefaultUploadsProps) {
  const { data } = useDefaultUploads(ytChannelId);

  return (
    <>
      {data?.uploads.map((upload) => {
        return (
          <Card.Container key={upload.id}>
            <div className="relative group">
              <div className="overflow-hidden">
                <VideoPlayer item={upload} />
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <Card.Menu id={upload.id} ytId={upload.ytId} />
              </div>
            </div>
            <Card.Content>
              <Card.Title title={upload.title} onClick={() => {}} />
              <PublishedTimeAgo date={upload.publishedAt} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2 mt-auto">
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
                    <DeleteUpload
                      handleSideEffect={handleSideEffect}
                      ytChannelId={ytChannelId}
                      ytVideoIds={[upload.ytId]}
                    />
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card.Container>
        );
      })}
    </>
  );
}

