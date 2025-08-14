import { useTypedChannelYtId } from "@/shared/hooks/useDashboardParams";
import { useState } from "react";
import { useSaveUpload } from "@/features/Upload/hooks/useSaveUpload";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";
import { useRefetchChannelUploads } from "@/features/Upload/hooks/useUploadsList";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";
import { StoryboardArtifact } from "@/features/Storyboard/useStoryboards";
import useStoryboards from "@/features/Storyboard/useStoryboards";
import {
  StoryboardContainer,
  Header,
  StoryboardItem,
  Viewer,
} from "@/features/Storyboard/components";

export default function StoryboardPage() {
  const ytChannelId = useTypedChannelYtId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStoryboard, setActiveStoryboard] =
    useState<StoryboardArtifact | null>(null);

  const refetchChannelMetadata = useRefetchChannelMetadata();

  const refetchChannelUploads = useRefetchChannelUploads(ytChannelId);

  const save = useSaveUpload(() => {
    refetchChannelMetadata(ytChannelId);
  });

  const handleSideEffect = () => {
    handleClose();
    refetchChannelMetadata(ytChannelId);
    refetchChannelUploads();
    refetch();
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

  const { data: storyboards, isLoading, error, refetch } = useStoryboards();

  return (
    <StoryboardContainer
      isLoading={isLoading}
      isError={!!error}
      data={storyboards}
    >
      {(storyboards) => (
        <div className="container mx-auto p-4">
          <Header storyboards={storyboards} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {storyboards.map((storyboard) => (
              <StoryboardItem
                key={storyboard.id}
                storyboard={storyboard}
                onStoryboardClick={(storyboard) => {
                  setActiveStoryboard(storyboard);
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
        </div>
      )}
    </StoryboardContainer>
  );
}
