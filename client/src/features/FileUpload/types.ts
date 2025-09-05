export interface UploadedFileInfo {
  filename: string;
  sizeInBytes: number;
}

export interface UploadFile {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedAt: Date;
  status: string;
}

export interface UploadProgress {
  uploadId: string;
  progress: number;
  status: string;
  bytesUploaded: number;
  totalBytes: number;
  estimatedTimeRemaining?: number;
}

export interface UploadState {
  files: UploadFile[];
  uploadsInProgress: Map<string, UploadProgress>;
  isUploading: boolean;
}
