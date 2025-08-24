import { useSearchParams } from "react-router-dom";
import {
  useSaveUpload,
  useCreateStoryboard,
  VideoPlayer,
  DeleteUpload,
} from "@features/Upload";
import { useRefetchChannelMetadata } from "@entities/Channel";
import type { PropsWithChildren } from "react";
import type { SortOrder } from "@shared/api";
import { useUploadsList } from "@features/Upload";
import { Card } from "@shared/ui";
import { timeAgo } from "@shared/utils";

export default function DefaultUploads({
  ytChannelId,
}: {
  ytChannelId: string;
}) {
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const [searchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "DESC") as SortOrder;
  const { data, refetch } = useUploadsList(
    ytChannelId,
    sortOrder
  );

  const handleSideEffect = () => {
    refetch();
    refetchChannelMetadata();
  };

  const save = useSaveUpload(handleSideEffect);
  const { mutateAsync } = useCreateStoryboard(ytChannelId);

  const handleSave = (ytVideoIds: string[]) => {
    save({
      uploads: ytVideoIds.map((ytVideoId) => ({ ytVideoId, ytChannelId })),
    });
  };

  const handleCreateStoryboard = (ytVideoId: string) => {
    mutateAsync({
      ytVideoId,
    });
  };

  return (
    <Wrapper>
      {data?.uploads.map((upload) => {
        const cardMenuSlot = <Card.Menu id={upload.id} ytId={upload.ytId} />;

        const secondRow = (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-base-content/70 truncate min-w-0">
                {timeAgo(upload.publishedAt)}
              </span>
              <span className="text-xs text-base-content/50">•</span>
              <span className="text-xs text-base-content/70">12:34</span>
            </div>
          </div>
        );

        const actionButtonSlot = (
          <div className="flex gap-2 mt-auto">
            <button
              className="btn btn-soft btn-success btn-md flex-1"
              onClick={() => {
                handleSave([upload.ytId]);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-soft btn-warning btn-md flex-1"
              onClick={() => handleCreateStoryboard(upload.ytId)}
            >
              Storyboard
            </button>
            <DeleteUpload
              handleSideEffect={handleSideEffect}
              ytChannelId={ytChannelId}
              ytVideoIds={[upload.ytId]}
            />
          </div>
        );

        return (
          <Card.Container key={upload.id}>
            <div className="relative group">
              <div className="overflow-hidden">
                <VideoPlayer item={upload} />
              </div>
              {cardMenuSlot && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  {cardMenuSlot}
                </div>
              )}
            </div>
            <Card.Content>
              <Card.Title title={upload.title} onClick={() => {}} />
              {secondRow}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {actionButtonSlot}
                </div>
              </div>
            </Card.Content>
          </Card.Container>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="overflow-hidden">
      <div className="flex h-[70vh]">
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
