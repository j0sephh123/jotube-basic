import { Modal } from "@shared/ui";
import { clearProcessingData } from "@shared/store";
import { useProcessingState } from "@shared/store";
import { ManualThumbnailsPicker } from "./ManualThumbnailsPicker";
import { ManualStoryboardsPicker } from "./ManualStoryboardsPicker";
import { EpisodesPicker } from "./EpisodesPicker";
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
