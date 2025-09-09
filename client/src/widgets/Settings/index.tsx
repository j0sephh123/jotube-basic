import { useState } from "react";
import Converter from "./Converter";
import AutoDownload from "./AutoDownload";
import { PopoverWrapper } from "./PopoverWrapper";

type TabType = "auto-download" | "converter";

export function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>("auto-download");

  const tabs = [
    { id: "auto-download" as TabType, label: "Auto Download" },
    { id: "converter" as TabType, label: "Converter" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "auto-download":
        return <AutoDownload />;
      case "converter":
        return <Converter />;
      default:
        return null;
    }
  };

  return (
    <PopoverWrapper>
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
    </PopoverWrapper>
  );
}
