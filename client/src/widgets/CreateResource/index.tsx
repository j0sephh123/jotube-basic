import { useState } from "react";
import { PlusIcon, TvIcon, RadioIcon, MusicIcon } from "lucide-react";
import { Modal } from "@shared/ui";
import { CreateChannel } from "./CreateChannel";
import { CreateTv } from "./CreateTv";
import { setPlaylistModal } from "@features/Playlist";

type ResourceType = "channel" | "tv" | "playlist";

export default function CreateResource() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceType | null>(
    null
  );
  const [isFabOpen, setIsFabOpen] = useState(false);

  const handleResourceSelect = (resourceType: ResourceType) => {
    if (resourceType === "playlist") {
      setPlaylistModal({ type: "create" });
      setIsFabOpen(false);
      return;
    }
    setSelectedResource(resourceType);
    setIsModalVisible(true);
    setIsFabOpen(false);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedResource(null);
  };

  const toggleFab = () => {
    setIsFabOpen(!isFabOpen);
  };

  const renderModalContent = () => {
    if (!selectedResource) return null;

    switch (selectedResource) {
      case "channel":
        return <CreateChannel onClose={handleClose} />;
      case "tv":
        return <CreateTv onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <div className="relative">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-lg btn-circle btn-primary"
            onClick={toggleFab}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleFab();
              }
            }}
          >
            <PlusIcon className="size-6" />
          </div>

          {isFabOpen && (
            <>
              <div className="absolute bottom-0 right-0 mb-20">
                <button
                  className="btn btn-lg bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg"
                  onClick={() => handleResourceSelect("channel")}
                >
                  <RadioIcon className="size-5" />
                  <span className="text-sm font-medium">Channel</span>
                </button>
              </div>

              <div className="absolute bottom-0 right-0 mb-40">
                <button
                  className="btn btn-lg bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg"
                  onClick={() => handleResourceSelect("tv")}
                >
                  <TvIcon className="size-5" />
                  <span className="text-sm font-medium">TV</span>
                </button>
              </div>

              <div className="absolute bottom-0 right-0 mb-60">
                <button
                  className="btn btn-lg bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg"
                  onClick={() => handleResourceSelect("playlist")}
                >
                  <MusicIcon className="size-5" />
                  <span className="text-sm font-medium">Playlist</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        isModalVisible={isModalVisible}
        onClose={handleClose}
        maxWidth="600px"
        maxHeight="500px"
      >
        {renderModalContent()}
      </Modal>
    </>
  );
}
