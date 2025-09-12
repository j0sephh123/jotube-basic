import { useState } from "react";
import { PlusIcon, TvIcon, RadioIcon } from "lucide-react";
import { Modal } from "@shared/ui";
import { CreateChannel } from "./CreateChannel";
import { CreateTv } from "./CreateTv";

type ResourceType = "channel" | "tv";

export default function CreateResource() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceType | null>(
    null
  );
  const [isFabOpen, setIsFabOpen] = useState(false);

  const handleResourceSelect = (resourceType: ResourceType) => {
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
              <div
                className="tooltip tooltip-left absolute bottom-0 right-0 mb-20"
                data-tip="Create Channel"
              >
                <button
                  className="btn btn-lg btn-circle"
                  onClick={() => handleResourceSelect("channel")}
                >
                  <RadioIcon className="size-6" />
                </button>
              </div>

              <div
                className="tooltip tooltip-left absolute bottom-0 right-0 mb-40"
                data-tip="Create TV"
              >
                <button
                  className="btn btn-lg btn-circle"
                  onClick={() => handleResourceSelect("tv")}
                >
                  <TvIcon className="size-6" />
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
