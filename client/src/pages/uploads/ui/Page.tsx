import { useSearchParams } from "react-router-dom";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";
import { useSaveUpload } from "@/features/Upload/hooks/useSaveUpload";
import useUploadsList from "@/features/Upload/hooks/useUploadsList";
import { DefaultUploadCard } from "@/features/Upload/components/DefaultUploadCard";
import { useRefetchChannelMetadata } from "@/entities/Channel/model/useChannelMetadata";
import { PropsWithChildren } from "react";
import { useCreateStoryboard } from "@/features/Upload/hooks/useCreateStoryboard";
import { useTypedChannelYtId } from "@/shared/hooks/useDashboardParams";
import { SortOrder } from "@/generated/graphql";

export default function DefaultUploadsPage() {
  const ytChannelId = useTypedChannelYtId();
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const [searchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "DESC") as SortOrder;
  const { data, isLoading, error, refetch } = useUploadsList(
    ytChannelId,
    sortOrder
  );

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading uploads: {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        No data available
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
