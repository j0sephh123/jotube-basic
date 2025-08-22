import type { UploadWithStoryboard } from "@/features/Storyboard/model/useUploadsWithStoryboard";
import Modal from "@shared/ui/Modal";
import Container from "@/features/Thumbnails/ui/Container";

interface ViewerProps {
  isModalOpen: boolean;
  activeStoryboard: UploadWithStoryboard | null;
  onClose: () => void;
  onSave: () => void;
  onDelete: (ytVideoIds: string[]) => void;
}

export default function Viewer({
  isModalOpen,
  activeStoryboard,
  onClose,
  onSave,
  onDelete,
}: ViewerProps) {
  if (!activeStoryboard?.storyboard) return null;

  const storyboardFragments = activeStoryboard.storyboard.fragments;
  const storyboardBaseUrl = activeStoryboard.storyboard.url;
  const storyboardItems = Array.from({ length: storyboardFragments }).map(
    (_, index) => ({
      index,
      url: storyboardBaseUrl.replace("M$M", `M${index}`),
    })
  );

  return (
    <Modal
      isModalVisible={isModalOpen}
      onClose={onClose}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="w-full h-full">
        <div className="p-4 border-b border-base-300">
          <h2 className="text-xl font-semibold">
            {activeStoryboard.title || "Storyboard"}
          </h2>
          <p className="text-sm text-base-content/70">
            {activeStoryboard.storyboard.fragments} fragment
            {activeStoryboard.storyboard.fragments !== 1 ? "s" : ""}
          </p>
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
            onClick={() => onDelete([activeStoryboard.ytId])}
            type="button"
            className="btn btn-error"
          >
            Delete
          </button>
          <button type="button" className="btn btn-primary" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
