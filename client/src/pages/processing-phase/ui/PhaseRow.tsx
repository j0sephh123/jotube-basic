import React from "react";
import { Phase, PhaseStatus, ProcessingPhase } from ".";
import { formatRelative } from "./utils";
import { formatDuration } from "./utils";
import { formatAbs } from "./utils";
import { Chip } from "./Chip";
import { label } from "./utils";

export function PhaseRow({
  phase,
  status,
  row,
}: {
  phase: Phase;
  status: PhaseStatus;
  row: ProcessingPhase | null;
}) {
  return (
    <tr className="hover">
      <td className="font-medium">{label(phase)}</td>
      <td>
        {row?.createdAt ? (
          <span title={formatAbs(row.createdAt)}>
            {formatRelative(row.createdAt)}
          </span>
        ) : (
          "—"
        )}
      </td>
      <td>
        {row?.endedAt ? (
          <span title={formatAbs(row.endedAt)}>
            {formatRelative(row.endedAt)}
          </span>
        ) : (
          "—"
        )}
      </td>
      <td>
        {row?.createdAt ? (
          <span>{formatDuration(row.createdAt, row.endedAt ?? null)}</span>
        ) : (
          "—"
        )}
      </td>
      <td>
        <Chip
          status={status}
          startedAt={row?.createdAt}
          endedAt={row?.endedAt ?? null}
        />
      </td>
    </tr>
  );
}
