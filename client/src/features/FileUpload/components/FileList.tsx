import { useState } from "react";
import { type UploadFile } from "@features/FileUpload";

interface FileListProps {
  files: UploadFile[];
  onDelete: (fileId: string) => Promise<void>;
}

export const FileList = ({ files, onDelete }: FileListProps) => {
  const [deletingFiles, setDeletingFiles] = useState<Set<string>>(new Set());

  const handleDelete = async (fileId: string) => {
    setDeletingFiles((prev) => new Set(prev).add(fileId));
    try {
      await onDelete(fileId);
    } catch (error) {
      console.error("Failed to delete file:", error);
    } finally {
      setDeletingFiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div key={file.id} className="card bg-base-100 shadow-sm border">
          <div className="card-body p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium text-base">{file.originalName}</h3>
                <div className="text-sm text-base-content/70 space-y-1">
                  <div>Size: {formatFileSize(file.size)}</div>
                  <div>Type: {file.mimetype}</div>
                  <div>Uploaded: {formatDate(file.uploadedAt)}</div>
                  <div className="badge badge-sm badge-outline">
                    {file.status}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(file.id)}
                disabled={deletingFiles.has(file.id)}
                className={`btn btn-sm ${
                  deletingFiles.has(file.id)
                    ? "btn-disabled"
                    : "btn-ghost text-error"
                }`}
              >
                {deletingFiles.has(file.id) ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
