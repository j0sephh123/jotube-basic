import { Modal } from "@shared/ui";
import { clearProcessingData } from "@shared/store";
import { useProcessingState } from "@shared/store";
import { ManualThumbnailsPicker } from "@features/Thumbnails";
import { ManualStoryboardsPicker } from "@features/Storyboard";
import { EpisodesPicker } from "@features/Episode";
import { match } from "ts-pattern";

export default function ManualPicker() {
  const { items, type } = useProcessingState();

  return (
    <Modal
      isModalVisible={items.length > 0}
      onClose={clearProcessingData}
      maxWidth="100vw"
      maxHeight="100vh"
    >
      <div className="w-full h-screen p-0">
        {match(type)
          .with("thumbnails", () => <ManualThumbnailsPicker />)
          .with("storyboards", () => <ManualStoryboardsPicker />)
          .with("episodes", () => <EpisodesPicker />)
          .otherwise(() => null)}
      </div>
    </Modal>
  );
}
