import { useTypedChannelYtId } from "@/shared/hooks/useTypedParams";
import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useState } from "react";
import Modal from "@/shared/components/Modal";
import Container from "@/features/Thumbnail/components/Container";
import { useSaveUpload } from "@/features/Upload/hooks/useSaveUpload";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";
import { useRefetchChannelUploads } from "@/features/Upload/hooks/useUploadsList";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";

type StoryboardData = {
  id: number;
  fragments: number;
  url: string;
  createdAt: string;
  updatedAt: string;
};

type StoryboardArtifact = {
  id: number;
  ytId: string;
  title: string;
  src: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  channelId: number;
  nextPageToken: string | null;
  duration: number | null;
  artifact: string;
  storyboard: StoryboardData;
};

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

  const {
    data: storyboards,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["storyboards", ytChannelId],
    queryFn: () =>
      nestFetcher<StoryboardArtifact[]>({
        url: `/uploads-video/storyboards/${ytChannelId}`,
        method: "GET",
      }),
    enabled: !!ytChannelId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Storyboards...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Storyboards</h1>
          <p className="text-red-400">Failed to load storyboards</p>
        </div>
      </div>
    );
  }

  if (!storyboards || storyboards.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Storyboards Found</h1>
          <p className="text-gray-400">This channel has no storyboards yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Storyboards</h1>
        <p className="text-gray-600">
          {storyboards.length} storyboard{storyboards.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storyboards.map((storyboard) => (
          <div
            key={storyboard.id}
            className="bg-base-200 rounded-lg p-4 shadow-md"
          >
            <h3 className="font-semibold text-lg mb-2">{storyboard.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Published: {new Date(storyboard.publishedAt).toLocaleDateString()}
            </p>
            {storyboard.duration && (
              <p className="text-sm text-gray-600 mb-2">
                Duration: {Math.floor(storyboard.duration / 60)}:
                {String(storyboard.duration % 60).padStart(2, "0")}
              </p>
            )}
            {storyboard.storyboard && (
              <p className="text-sm text-gray-600 mb-2">
                Fragments: {storyboard.storyboard.fragments}
              </p>
            )}
            <div className="flex gap-2">
              {storyboard.storyboard && (
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setActiveStoryboard(storyboard);
                    setIsModalOpen(true);
                  }}
                >
                  View Storyboard
                </button>
              )}
              <button
                type="button"
                className="btn btn-sm btn-error"
                onClick={() => handleDelete([storyboard.ytId])}
              >
                Delete
              </button>
            </div>
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
              <p className="text-sm text-gray-500">
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
                  <div className="mt-2 text-xs text-gray-500">M{index}</div>
                </div>
              ))}
            </div>
          </Container>
          <div className="p-4 border-t border-base-300 flex justify-end gap-2">
            <button
              onClick={handleClose}
              type="button"
              className="btn btn-outline btn-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
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
