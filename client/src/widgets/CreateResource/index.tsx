import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Modal } from "@shared/ui";
import { CreateChannel } from "./CreateChannel";
import { CreateTv } from "./CreateTv";

const tabs = [
  { id: "channel", label: "Channel" },
  { id: "tv", label: "TV" },
] as const;

type TabType = (typeof tabs)[number]["id"];

export default function CreateResource() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType>("channel");

  const renderTabContent = () => {
    switch (activeTab) {
      case "channel":
        return <CreateChannel onClose={() => setIsModalVisible(false)} />;

      case "tv":
        return <CreateTv onClose={() => setIsModalVisible(false)} />;

      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalVisible(true)}
        className="btn btn-accent btn-circle fixed z-50 bottom-3 right-3"
      >
        <PlusIcon />
      </button>
      <Modal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        maxWidth="600px"
        maxHeight="500px"
      >
        <div role="tablist" className="tabs tabs-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="tab-panel mt-8">
          {renderTabContent()}
        </div>
      </Modal>
    </>
  );
}
