export type Phase = "DOWNLOAD" | "SCREENSHOTS" | "THUMBNAILS";

export type PhaseStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";

export type ProcessingPhase = {
  uploadsVideoId: number;
  phase: Phase;
  createdAt: string;
  endedAt: string | null;
};

export type UploadsVideo = {
  id: number;
  ytId: string;
  title: string;
  artifact:
    | "VIDEO"
    | "SAVED"
    | "DOWNLOADED"
    | "STORYBOARD"
    | "THUMBNAIL"
    | "SCREENSHOT";
};

export type VideoWithPhases = UploadsVideo & { phases: ProcessingPhase[] };
