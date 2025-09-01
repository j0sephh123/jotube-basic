import { Phase, PhaseStatus, ProcessingPhase } from ".";

export function label(p: Phase) {
  switch (p) {
    case "DOWNLOAD":
      return "Download";
    case "SCREENSHOTS":
      return "Screenshots";
    case "THUMBNAILS":
      return "Thumbnails";
  }
}
export function formatAbs(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString();
}
export function isoMinutesAgo(min: number) {
  return new Date(Date.now() - min * 60000).toISOString();
}
export function formatDuration(startIso: string, endIso: string | null) {
  const start = new Date(startIso).getTime();
  const end = endIso ? new Date(endIso).getTime() : Date.now();
  const ms = Math.max(0, end - start);
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s.toString().padStart(2, "0")}s`;
  return `${s}s`;
}
export function formatRelative(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - d);
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  if (hr > 0) return `${hr}h ${min % 60}m ago`;
  if (min > 0) return `${min}m ${sec % 60}s ago`;
  return `${sec}s ago`;
}
export function derivePhaseStatus(
  phases: ProcessingPhase[],
  phase: Phase
): { status: PhaseStatus; row: ProcessingPhase | null } {
  const row = phases.find((p) => p.phase === phase) ?? null;
  if (!row) return { status: "NOT_STARTED", row: null };
  if (row.endedAt == null) return { status: "IN_PROGRESS", row };
  return { status: "DONE", row };
}
export function latestActivityIso(phases: ProcessingPhase[]) {
  if (phases.length === 0) return null;
  const times: number[] = [];
  for (const p of phases) {
    times.push(new Date(p.createdAt).getTime());
    if (p.endedAt) times.push(new Date(p.endedAt).getTime());
  }
  const max = Math.max(...times);
  return new Date(max).toISOString();
}
