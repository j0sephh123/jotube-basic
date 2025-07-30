import { useState } from "react";
import {
  Download,
  Camera,
  ImageIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useStore } from "@/store/store";

type OperationType = "download" | "screenshots" | "thumbnails";

type DownloadOperation = {
  progress: number;
  filename: string;
}

type ScreenshotsOperation = {
  current: number;
  filename: string;
}

type ThumbnailsOperation = {
  filename: string;
}

type Operation = DownloadOperation | ScreenshotsOperation | ThumbnailsOperation;

export default function ProcessingProgress() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { operations } = useStore();

  const activeOperations = Object.entries(operations).filter(
    ([, op]) => op !== null
  ) as [OperationType, Operation][];

  const [type, operation] = activeOperations[0] || [];

  if (!type || !operation) return null;

  const getOperationIcon = (type: OperationType) => {
    switch (type) {
      case "download":
        return <Download className="h-4 w-4" />;
      case "screenshots":
        return <Camera className="h-4 w-4" />;
      case "thumbnails":
        return <ImageIcon className="h-4 w-4" />;
    }
  };

  const getOperationColor = (type: OperationType) => {
    switch (type) {
      case "download":
        return "text-blue-400";
      case "screenshots":
        return "text-green-400";
      case "thumbnails":
        return "text-purple-400";
    }
  };

  const isDownloadOperation = (op: Operation): op is DownloadOperation => {
    return "progress" in op;
  };

  const isScreenshotsOperation = (
    op: Operation
  ): op is ScreenshotsOperation => {
    return "current" in op;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            type === "download"
              ? "bg-blue-400"
              : type === "screenshots"
              ? "bg-green-400"
              : "bg-purple-400"
          } border border-base-100 animate-pulse`}
        />
        <span className="text-sm font-medium capitalize">{type}</span>
      </div>

      {!isCollapsed && (
        <div className="flex items-center gap-2 min-w-0">
          <div className={getOperationColor(type)}>
            {getOperationIcon(type)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="badge badge-sm badge-outline">
                {isDownloadOperation(operation) &&
                  `${Math.round(operation.progress)}%`}
                {isScreenshotsOperation(operation) && `${operation.current}`}
                {type === "thumbnails" && "Processing"}
              </span>
            </div>
            {(type === "download" || type === "screenshots") && (
              <div className="w-24 mt-1">
                {isDownloadOperation(operation) ? (
                  <progress
                    value={operation.progress}
                    max="100"
                    className="progress progress-xs w-full"
                  />
                ) : (
                  <div className="progress progress-xs w-full">
                    <div
                      className="progress-bar bg-green-400 animate-pulse"
                      style={{ width: "60%" }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="btn btn-ghost btn-xs p-0 h-6 w-6 min-h-0"
      >
        {isCollapsed ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronUp className="h-3 w-3" />
        )}
      </button>
    </div>
  );
}
