import { useStoryboardProcessing } from "@shared/hooks";
import { useSaveUpload } from "@features/Upload";
import { useRefetchChannelMetadata } from "@entities/Channel";
import { useUploadsDelete } from "@features/Upload";
import { useTypedChannelYtId } from "@features/Dashboard";
import { Modal } from "@shared/ui";
import { useRef, useEffect } from "react";

export default function StoryboardProcessing() {
  const {
    storyboardProcessingData,
    clearStoryboardProcessingData,
    setStoryboardProcessingData,
  } = useStoryboardProcessing();

  const firstChannel = storyboardProcessingData[0];
  const firstUpload = firstChannel?.uploads[0];
  const currentChannelId = useTypedChannelYtId();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const refetchChannelMetadata = useRefetchChannelMetadata();
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [firstUpload?.id]);

  const save = useSaveUpload(() => {
    if (firstChannel?.ytChannelId) {
      refetchChannelMetadata(firstChannel.ytChannelId);
    }
  });

  const handleSideEffect = () => {
    const currentChannelIndex = storyboardProcessingData.findIndex(
      (channel) => channel.ytChannelId === currentChannelId
    );

    if (currentChannelIndex !== -1) {
      const currentChannel = storyboardProcessingData[currentChannelIndex];
      if (currentChannel) {
        const remainingUploads = currentChannel.uploads.slice(1);

        if (remainingUploads.length > 0) {
          const updatedData = [...storyboardProcessingData];
          updatedData[currentChannelIndex] = {
            ytChannelId: currentChannel.ytChannelId,
            uploads: remainingUploads,
          };
          setStoryboardProcessingData(updatedData);
        } else {
          const updatedData = storyboardProcessingData.filter(
            (_, index) => index !== currentChannelIndex
          );
          if (updatedData.length > 0) {
            setStoryboardProcessingData(updatedData);
          } else {
            clearStoryboardProcessingData();
          }
        }
      }
    }

    if (firstChannel?.ytChannelId) {
      refetchChannelMetadata(firstChannel.ytChannelId);
    }
  };

  const handleSave = () => {
    if (!firstUpload || !firstChannel?.ytChannelId) return;
    save({
      uploads: [
        { ytVideoId: firstUpload.ytId, ytChannelId: firstChannel.ytChannelId },
      ],
    }).then(handleSideEffect);
  };

  const deleteUploadFromDbMutation = useUploadsDelete(handleSideEffect);

  const handleDelete = () => {
    if (!firstUpload || !firstChannel?.ytChannelId) return;
    deleteUploadFromDbMutation({
      ytChannelId: firstChannel.ytChannelId,
      ytVideoIds: [firstUpload.ytId],
    }).then(handleSideEffect);
  };

  if (storyboardProcessingData.length === 0) {
    return null;
  }

  if (!firstUpload?.storyboard) return null;

  const storyboardFragments = firstUpload.storyboard.fragments;
  const storyboardBaseUrl = firstUpload.storyboard.url;
  const storyboardItems = Array.from({ length: storyboardFragments }).map(
    (_, index) => ({
      index,
      url: storyboardBaseUrl.replace("M$M", `M${index}`),
    })
  );

  return (
    <Modal
      isModalVisible
      onClose={clearStoryboardProcessingData}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="w-full h-full flex flex-col">
        <div className="p-4 border-b border-base-300 bg-base-100 sticky top-0 z-10">
          <h2 className="text-lg font-semibold">
            {firstUpload.title || "Storyboard"}
          </h2>
          <div className="flex gap-4 text-sm text-base-content/70">
            <span>
              {firstUpload.storyboard.fragments} fragment
              {firstUpload.storyboard.fragments !== 1 ? "s" : ""}
            </span>
            <span>
              {firstChannel?.uploads.length || 0} item
              {(firstChannel?.uploads.length || 0) !== 1 ? "s" : ""} left
            </span>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex-1 w-full p-4 overflow-y-auto"
        >
          <div className="grid grid-cols-2 gap-4">
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
        </div>
        <div className="p-4 border-t border-base-300 bg-base-100 sticky bottom-0 z-10">
          <div className="flex justify-end gap-2">
            <button
              onClick={handleDelete}
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
      </div>
    </Modal>
  );
}
