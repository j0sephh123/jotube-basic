import type { Phase } from "./types";

export const PHASE_LABELS: Record<Phase, string> = {
  DOWNLOAD: "Download",
  SCREENSHOTS: "Screenshots",
  THUMBNAILS: "Thumbnails",
} as const;

export const PHASE_STATUSES = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
} as const;
