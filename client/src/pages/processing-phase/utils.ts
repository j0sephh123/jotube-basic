import type { Phase, PhaseStatus, ProcessingPhase } from "./types";
import { PHASE_LABELS } from "./constants";

export function label(p: Phase) {
  return PHASE_LABELS[p];
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
