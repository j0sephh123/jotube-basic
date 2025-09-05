import { RefreshCw } from "lucide-react";
import { FileUploadDropzone } from "./FileUploadDropzone";
import { FileList } from "./FileList";
import { useFileUpload, type UploadFile } from "@features/FileUpload";

export const FileUpload = () => {
  const { uploadedFiles, refetch, deleteFile } = useFileUpload();

  const handleUploadComplete = (file: UploadFile) => {
    console.log("Upload completed:", file);
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);
  };

  const handleRefresh = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Failed to refresh files:", error);
    }
  };

  return (
    <div className="space-y-4">
      <FileUploadDropzone
        onUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
        accept="image/*,video/*,.pdf"
      />

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

      {uploadedFiles.length > 0 ? (
        <FileList files={uploadedFiles} onDelete={deleteFile} />
      ) : (
        <div className="text-center text-base-content/50 py-8">
          No files uploaded yet
        </div>
      )}
    </div>
  );
};
