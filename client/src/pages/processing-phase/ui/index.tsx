import React, { useMemo, useState } from "react";
import { Chip } from "./Chip";
import { PhaseRow } from "./PhaseRow";
import {
  derivePhaseStatus,
  formatAbs,
  formatRelative,
  isoMinutesAgo,
  latestActivityIso,
} from "./utils";
import { TableWrapper } from "./TableWrapper";

export type Phase = "DOWNLOAD" | "SCREENSHOTS" | "THUMBNAILS";

export type ProcessingPhase = {
  uploadsVideoId: number;
  phase: Phase;
  createdAt: string; // ISO
  endedAt: string | null; // ISO or null
};

type UploadsVideo = {
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

type VideoWithPhases = UploadsVideo & { phases: ProcessingPhase[] };

const MOCK_DATA: VideoWithPhases[] = [
  {
    id: 1,
    ytId: "abc123xyz01",
    title: "How to Cook Perfect Pasta",
    artifact: "THUMBNAIL",
    phases: [
      {
        uploadsVideoId: 1,
        phase: "DOWNLOAD",
        createdAt: isoMinutesAgo(35),
        endedAt: isoMinutesAgo(33),
      },
      {
        uploadsVideoId: 1,
        phase: "SCREENSHOTS",
        createdAt: isoMinutesAgo(32),
        endedAt: isoMinutesAgo(30),
      },
      {
        uploadsVideoId: 1,
        phase: "THUMBNAILS",
        createdAt: isoMinutesAgo(29),
        endedAt: isoMinutesAgo(27),
      },
    ],
  },
  {
    id: 2,
    ytId: "def456uvw02",
    title: "React State Management in 10 Minutes",
    artifact: "VIDEO",
    phases: [
      {
        uploadsVideoId: 2,
        phase: "DOWNLOAD",
        createdAt: isoMinutesAgo(8),
        endedAt: null, // in progress
      },
      // screenshots/thumbnails not started (no rows)
    ],
  },
  {
    id: 3,
    ytId: "ghi789rst03",
    title: "Street Photography Tips",
    artifact: "DOWNLOADED",
    phases: [
      {
        uploadsVideoId: 3,
        phase: "DOWNLOAD",
        createdAt: isoMinutesAgo(20),
        endedAt: isoMinutesAgo(19),
      },
      {
        uploadsVideoId: 3,
        phase: "SCREENSHOTS",
        createdAt: isoMinutesAgo(18),
        endedAt: null,
      },
    ],
  },
];

export type PhaseStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";

export function ProcessingPhasePage() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [rows] = useState<VideoWithPhases[]>(MOCK_DATA);

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const la = latestActivityIso(a.phases);
      const lb = latestActivityIso(b.phases);
      if (!la && !lb) return 0;
      if (!la) return 1;
      if (!lb) return -1;
      return new Date(lb).getTime() - new Date(la).getTime();
    });
  }, [rows]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Processing Log</h1>

      <TableWrapper>
        <>
          {sorted.map((v) => {
            const d = derivePhaseStatus(v.phases, "DOWNLOAD");
            const s = derivePhaseStatus(v.phases, "SCREENSHOTS");
            const t = derivePhaseStatus(v.phases, "THUMBNAILS");
            const last = latestActivityIso(v.phases);
            const isOpen = !!expanded[v.id];

            return (
              <React.Fragment key={v.id}>
                <tr className="hover">
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        setExpanded((e) => ({ ...e, [v.id]: !e[v.id] }))
                      }
                      aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                      {isOpen ? "−" : "+"}
                    </button>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium">{v.title}</span>
                      <span className="text-xs opacity-70">{v.ytId}</span>
                    </div>
                  </td>
                  <td>
                    <Chip
                      status={d.status}
                      startedAt={d.row?.createdAt}
                      endedAt={d.row?.endedAt ?? null}
                    />
                  </td>
                  <td>
                    <Chip
                      status={s.status}
                      startedAt={s.row?.createdAt}
                      endedAt={s.row?.endedAt ?? null}
                    />
                  </td>
                  <td>
                    <Chip
                      status={t.status}
                      startedAt={t.row?.createdAt}
                      endedAt={t.row?.endedAt ?? null}
                    />
                  </td>
                  <td>
                    {last ? (
                      <span title={formatAbs(last)}>
                        {formatRelative(last)}
                      </span>
                    ) : (
                      <span className="opacity-70">—</span>
                    )}
                  </td>
                  <td className="space-x-2">
                    <button className="btn btn-xs">Open video</button>
                    <button className="btn btn-xs btn-outline">
                      Screenshots
                    </button>
                    <button className="btn btn-xs btn-outline">
                      Thumbnails
                    </button>
                  </td>
                </tr>

                {isOpen && (
                  <tr>
                    <td />
                    <td colSpan={6} className="bg-base-200">
                      <div className="p-3">
                        <div className="overflow-x-auto">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Phase</th>
                                <th>Started</th>
                                <th>Ended</th>
                                <th>Duration</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <PhaseRow
                                phase="DOWNLOAD"
                                status={d.status}
                                row={d.row}
                              />
                              <PhaseRow
                                phase="SCREENSHOTS"
                                status={s.status}
                                row={s.row}
                              />
                              <PhaseRow
                                phase="THUMBNAILS"
                                status={t.status}
                                row={t.row}
                              />
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </>
      </TableWrapper>
    </div>
  );
}
