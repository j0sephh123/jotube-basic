import { useTypedChannelYtId } from "@/shared/hooks/useDashboardParams";
import { useState } from "react";
import Modal from "@/shared/components/Modal";
import Container from "@/features/Thumbnail/components/Container";
import { useSaveUpload } from "@/features/Upload/hooks/useSaveUpload";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";
import { useRefetchChannelUploads } from "@/features/Upload/hooks/useUploadsList";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";
import InfoCard from "@/shared/components/InfoCard";
import { StoryboardArtifact } from "@/features/Storyboard/useStoryboards";
import useStoryboards from "@/features/Storyboard/useStoryboards";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import Loading from "@/shared/components/static/Loading";
import NoDataAvailable from "@/shared/components/static/NoDataAvailable";

export default function StoryboardPage() {
  const ytChannelId = useTypedChannelYtId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStoryboard, setActiveStoryboard] =
    useState<StoryboardArtifact | null>(null);
  const storyboardFragments = activeStoryboard?.storyboard?.fragments ?? 0;
  const storyboardBaseUrl = activeStoryboard?.storyboard?.url ?? "";
  const storyboardItems = Array.from({ length: storyboardFragments }).map(
    (_, index) => ({
      index,
      url: storyboardBaseUrl.replace("M$M", `M${index}`),
    })
  );

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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message="Error loading storyboards" />;
  }

  if (!storyboards || storyboards.length === 0) {
    return <NoDataAvailable message="No storyboards found" />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Storyboards</h1>
        <p className="text-base-content/70">
          {storyboards.length} storyboard{storyboards.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storyboards.map((storyboard) => (
          <div
            key={storyboard.id}
            onClick={() => {
              if (storyboard.storyboard) {
                setActiveStoryboard(storyboard);
                setIsModalOpen(true);
              }
            }}
            className="cursor-pointer"
          >
            <InfoCard
              title={storyboard.title}
              content={
                <div className="space-y-1">
                  <p className="text-sm text-base-content/70">
                    Published:{" "}
                    {new Date(storyboard.publishedAt).toLocaleDateString()}
                  </p>
                  {storyboard.duration && (
                    <p className="text-sm text-base-content/70">
                      Duration: {Math.floor(storyboard.duration / 60)}:
                      {String(storyboard.duration % 60).padStart(2, "0")}
                    </p>
                  )}
                  {storyboard.storyboard && (
                    <p className="text-sm text-base-content/70">
                      Fragments: {storyboard.storyboard.fragments}
                    </p>
                  )}
                </div>
              }
              showTooltip
            />
          </div>
        ))}
      </div>
      <Modal
        isModalVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="w-full h-full">
          <div className="p-4 border-b border-base-300">
            <h2 className="text-xl font-semibold">
              {activeStoryboard?.title || "Storyboard"}
            </h2>
            {activeStoryboard?.storyboard && (
              <p className="text-sm text-base-content/70">
                {activeStoryboard.storyboard.fragments} fragment
                {activeStoryboard.storyboard.fragments !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <Container>
            <div className="w-full p-4 grid grid-cols-2 gap-4">
              {storyboardItems.map(({ index, url }) => (
                <div
                  key={index}
                  className="bg-base-200 rounded shadow-sm p-2 flex flex-col items-center"
                >
                  <img
                    src={url}
                    alt={`Storyboard M${index}`}
                    className="w-full h-auto object-contain"
                  />
                  <div className="mt-2 text-xs text-base-content/70">
                    M{index}
                  </div>
                </div>
              ))}
            </div>
          </Container>
          <div className="p-4 border-t border-base-300 flex justify-end gap-2">
            <button
              onClick={() =>
                activeStoryboard && handleDelete([activeStoryboard.ytId])
              }
              type="button"
              className="btn btn-error"
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
