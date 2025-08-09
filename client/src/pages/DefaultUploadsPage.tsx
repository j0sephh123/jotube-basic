import { useSearchParams } from "react-router-dom";
import { useTypedChannelYtId } from "@/shared/hooks/useDashboardParams";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";
import { useSaveUpload } from "@/features/Upload/hooks/useSaveUpload";
import useUploadsList from "@/features/Upload/hooks/useUploadsList";
import { DefaultUploadCard } from "@/features/Upload/components/DefaultUploadCard";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";
import { SortOrder } from "@/shared/types/searchParams";
import { PropsWithChildren } from "react";
import { useCreateStoryboard } from "@/features/Upload/hooks/useCreateStoryboard";

export default function DefaultUploadsPage() {
  const ytChannelId = useTypedChannelYtId();
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const [searchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "desc") as SortOrder;
  const { data, refetch } = useUploadsList(ytChannelId, sortOrder);

  const handleSideEffect = () => {
    refetch();
    refetchChannelMetadata(ytChannelId);
  };

  const deleteUploadFromDbMutation = useDeleteUploads(handleSideEffect);
  const save = useSaveUpload(handleSideEffect);
  const { mutateAsync } = useCreateStoryboard(ytChannelId);

  const handleSave = (ytVideoIds: string[]) => {
    save({
      uploads: ytVideoIds.map((ytVideoId) => ({ ytVideoId, ytChannelId })),
    });
  };

  const handleDelete = (ytVideoIds: string[]) => {
    deleteUploadFromDbMutation({
      ytChannelId,
      ytVideoIds,
    }).then(() => refetch());
  };

  const handleCreateStoryboard = (ytVideoId: string) => {
    mutateAsync({
      ytVideoId,
    });
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Wrapper>
      {data.uploads.map((upload) => (
        <DefaultUploadCard
          key={upload.id}
          ytChannelId={ytChannelId}
          item={upload}
          onSave={handleSave}
          onDelete={handleDelete}
          onCreateStoryboard={handleCreateStoryboard}
        />
      ))}
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
