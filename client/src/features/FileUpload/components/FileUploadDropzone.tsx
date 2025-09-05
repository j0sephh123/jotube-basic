import { useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { useFileUpload, type UploadFile } from "@features/FileUpload";

interface FileUploadDropzoneProps {
  onUploadComplete?: (file: UploadFile) => void;
  onUploadError?: (error: Error) => void;
  accept?: string;
}

export const FileUploadDropzone = ({
  onUploadComplete,
  onUploadError,
  accept,
}: FileUploadDropzoneProps) => {
  const { uploadFile, isUploading } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile(file);
      onUploadComplete?.(result);
    } catch (error) {
      onUploadError?.(error as Error);
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        disabled={isUploading}
        className={`btn ${isUploading ? "btn-disabled" : "btn-primary"} w-full`}
        title={isUploading ? "Uploading..." : "Upload file"}
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            Choose File to Upload
          </>
        )}
      </button>
    </>
  );
};
