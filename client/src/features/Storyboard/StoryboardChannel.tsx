import { useTypedChannelYtId } from "@widgets/Dashboard/lib/useDashboardParams";
import { useState } from "react";
import { useSaveUpload } from "@/features/Upload/hooks/useSaveUpload";
import { useRefetchChannelMetadata } from "@/entities/Channel/model/useChannelMetadata";
import { useRefetchChannelUploads } from "@/features/Upload/hooks/useUploadsList";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";
import { UploadWithStoryboard } from "@/features/Storyboard/useUploadsWithStoryboard";
import {
  StoryboardContainer,
  StoryboardItem,
  Viewer,
} from "@/features/Storyboard/components";

export default function StoryboardChannel() {
  const ytChannelId = useTypedChannelYtId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStoryboard, setActiveStoryboard] =
    useState<UploadWithStoryboard | null>(null);

  const refetchChannelMetadata = useRefetchChannelMetadata();

  const refetchChannelUploads = useRefetchChannelUploads(ytChannelId);

  const save = useSaveUpload(() => {
    refetchChannelMetadata(ytChannelId);
  });

  const handleSideEffect = () => {
    handleClose();
    refetchChannelMetadata(ytChannelId);
    refetchChannelUploads();
  };

  const handleSave = () => {
    if (!activeStoryboard) return;
    save({
      uploads: [{ ytVideoId: activeStoryboard.ytId, ytChannelId }],
    }).then(handleSideEffect);
  };

  const deleteUploadFromDbMutation = useDeleteUploads(handleSideEffect);

  const handleDelete = (ytVideoIds: string[]) => {
    deleteUploadFromDbMutation({
      ytChannelId,
      ytVideoIds,
    }).then(handleSideEffect);
  };

  const handleClose = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setActiveStoryboard(null);
    }
  };

  return (
    <StoryboardContainer>
      {(uploadsWithStoryboard) => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadsWithStoryboard.map((uploadWithStoryboard) => (
              <StoryboardItem
                key={uploadWithStoryboard.id}
                storyboard={uploadWithStoryboard}
                onStoryboardClick={(uploadWithStoryboard) => {
                  setActiveStoryboard(uploadWithStoryboard);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
          <Viewer
            isModalOpen={isModalOpen}
            activeStoryboard={activeStoryboard}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </>
      )}
    </StoryboardContainer>
  );
}
