import { useRef } from "react";
import { Upload } from "lucide-react";
import { useFileUpload, type UploadFile } from "@features/FileUpload";
import { IconButton } from "@shared/ui";

interface FileUploadDropzoneProps {
  onUploadComplete?: (file: UploadFile) => void;
  onUploadError?: (error: Error) => void;
  accept?: string;
  episodeId: string;
}

export const FileUploadDropzone = ({
  onUploadComplete,
  onUploadError,
  accept,
  episodeId,
}: FileUploadDropzoneProps) => {
  const { uploadFile, isUploading } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile({ file, episodeId });
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
      <IconButton onClick={handleClick} icon={<Upload className="h-4 w-4" />} />
    </>
  );
};
