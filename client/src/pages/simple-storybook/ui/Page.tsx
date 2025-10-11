import StatWithActions from "@widgets/StatWithActions";
import { Camera, Images, Film, Download } from "lucide-react";

export default function SimpleStorybookPage() {
  const demoValue = 42;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          StatWithActions Component Demo
        </h1>
        <p className="text-base-content/70">
          Basic examples showcasing the StatWithActions component with various
          configurations and use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Screenshots */}
        <div className="p-4 border border-base-300 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Screenshots</h3>
          <StatWithActions
            label="Screenshots"
            value={demoValue}
            layout="horizontal"
            leftAction={{
              tooltip: "View Screenshots",
              onClick: () => console.log("View screenshots clicked"),
            }}
            rightAction={{
              icon: <Images className="w-4 h-4" />,
              tooltip: "View Gallery",
              onClick: () => console.log("View gallery clicked"),
            }}
          />
        </div>

        {/* Storyboards */}
        <div className="p-4 border border-base-300 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Storyboards</h3>
          <StatWithActions
            label="Storyboards"
            value={demoValue}
            layout="horizontal"
            leftAction={{
              tooltip: "View Storyboards",
              onClick: () => console.log("View storyboards clicked"),
            }}
            rightAction={{
              icon: <Film className="w-4 h-4" />,
              tooltip: "Generate Storyboards",
              onClick: () => console.log("Generate storyboards clicked"),
            }}
          />
        </div>

        {/* Downloads */}
        <div className="p-4 border border-base-300 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Downloads</h3>
          <StatWithActions
            label="Downloads"
            value={demoValue}
            layout="horizontal"
            rightAction={{
              icon: <Download className="w-4 h-4" />,
              tooltip: "Download All",
              onClick: () => console.log("Download clicked"),
            }}
          />
        </div>
      </div>
    </div>
  );
}
