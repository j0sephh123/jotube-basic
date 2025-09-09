import { useState } from "react";
import Converter from "./Converter";
import { PopoverWrapper } from "./PopoverWrapper";

type TabType = "converter" | "autoDownload";

export function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>("converter");

  const tabs = [{ id: "converter" as TabType, label: "Converter" }];

  const renderTabContent = () => {
    switch (activeTab) {
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

export { default as AutoDownload } from "./AutoDownload";
