import { useState } from "react";
import { useTypedChannelYtId } from "@features/Dashboard";
import { useSaveUpload } from "@features/Upload";
import { useRefetchChannelMetadata } from "@entities/Channel";
import { useDeleteUploads } from "@features/Upload";
import type { UploadWithStoryboard } from "@features/Storyboard";
import {
  StoryboardContainer,
  StoryboardItem,
  Viewer,
} from "@features/Storyboard";

export default function StoryboardChannel() {
  const ytChannelId = useTypedChannelYtId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStoryboard, setActiveStoryboard] =
    useState<UploadWithStoryboard | null>(null);

  const refetchChannelMetadata = useRefetchChannelMetadata();

  const save = useSaveUpload(() => {
    refetchChannelMetadata(ytChannelId);
  });

  const handleSideEffect = () => {
    handleClose();
    refetchChannelMetadata(ytChannelId);
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
