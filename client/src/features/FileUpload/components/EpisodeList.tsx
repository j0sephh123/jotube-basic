/* eslint-disable import/no-internal-modules */
import { useState } from "react";
import { formatFileSize } from "@shared/utils";
import { useEpisodeFiles } from "../hooks/useEpisodeFiles";
import { useFileUpload } from "../hooks/useFileUpload";
import { StaticStates } from "@shared/ui";
import { RefreshCw } from "lucide-react";

export const EpisodeList = () => {
  const { uploadedFiles, refetch, isLoading, error } = useEpisodeFiles();
  const { deleteFile } = useFileUpload();
  const [deletingFiles, setDeletingFiles] = useState<Set<string>>(new Set());

  const handleDelete = async (filename: string) => {
    setDeletingFiles((prev) => new Set(prev).add(filename));
    try {
      await deleteFile(filename);
    } catch (error) {
      console.error("Failed to delete file:", error);
    } finally {
      setDeletingFiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(filename);
        return newSet;
      });
    }
  };

  const handleRefresh = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Failed to refresh files:", error);
    }
  };

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={uploadedFiles.length === 0}
    >
      <div className="flex justify-between items-center">
        <div className="divider flex-1">Uploaded Files</div>
        <button
          onClick={handleRefresh}
          className="btn btn-sm btn-ghost"
          title="Refresh file list"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-2">
        {uploadedFiles.map((file) => (
          <div
            key={file.filename}
            className="card bg-base-100 shadow-sm border"
          >
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-base">{file.filename}</h3>
                  <div className="text-sm text-base-content/70">
                    <div>Size: {formatFileSize(file.sizeInBytes)}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(file.filename)}
                  disabled={deletingFiles.has(file.filename)}
                  className={`btn btn-sm ${
                    deletingFiles.has(file.filename)
                      ? "btn-disabled"
                      : "btn-ghost text-error"
                  }`}
                >
                  {deletingFiles.has(file.filename) ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StaticStates>
  );
};
