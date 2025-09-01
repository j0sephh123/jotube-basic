import { Chip } from "../StatusBadge";
import { derivePhaseStatus } from "../utils";
import { TableWrapper } from "../TableWrapper";
import { latestActivityIso, formatRelative, formatAbs } from "@shared/utils";
import { TitleCell } from "../TitleCell";
import { StatusCell } from "../StatusCell";
import { ActionsCell } from "../ActionsCell";
import { useData } from "../useData";
import { TableRow } from "../TableRow";

export function ProcessingPhasePage() {
  const sorted = useData();

  return (
    <TableWrapper>
      <>
        {sorted.map((v) => {
          const d = derivePhaseStatus(v.phases, "DOWNLOAD");
          const s = derivePhaseStatus(v.phases, "SCREENSHOTS");
          const t = derivePhaseStatus(v.phases, "THUMBNAILS");
          const last = latestActivityIso(v.phases);

          return (
            <TableRow key={v.id}>
              <TitleCell title={v.title} ytId={v.ytId} />
              <StatusCell
                chip={
                  <Chip
                    status={d.status}
                    startedAt={d.row?.createdAt}
                    endedAt={d.row?.endedAt ?? null}
                  />
                }
              />
              <StatusCell
                chip={
                  <Chip
                    status={s.status}
                    startedAt={s.row?.createdAt}
                    endedAt={s.row?.endedAt ?? null}
                  />
                }
              />
              <StatusCell
                chip={
                  <Chip
                    status={t.status}
                    startedAt={t.row?.createdAt}
                    endedAt={t.row?.endedAt ?? null}
                  />
                }
              />
              <td>
                {last ? (
                  <span title={formatAbs(last)}>{formatRelative(last)}</span>
                ) : (
                  <span className="opacity-70">—</span>
                )}
              </td>
              <ActionsCell />
            </TableRow>
          );
        })}
      </>
    </TableWrapper>
  );
}
