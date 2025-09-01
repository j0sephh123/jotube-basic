export type Phase = "DOWNLOAD" | "SCREENSHOTS" | "THUMBNAILS";

export type PhaseStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";

export type ProcessingPhase = {
  id: number;
  uploadsVideoId: number;
  phase: Phase;
  createdAt: string;
  endedAt: string | null;
  uploadsVideo: {
    id: number;
    ytId: string;
    title: string;
  };
};

export type VideoWithPhases = {
  id: number;
  ytId: string;
  title: string;
  phases: ProcessingPhase[];
};
