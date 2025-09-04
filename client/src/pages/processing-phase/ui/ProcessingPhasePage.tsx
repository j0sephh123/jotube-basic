import { Chip } from "../StatusBadge";
import { derivePhaseStatus } from "../utils";
import { TableWrapper } from "../TableWrapper";
import { latestActivityIso, formatRelative, formatAbs } from "@shared/utils";
import { TitleCell } from "../TitleCell";
import { StatusCell } from "../StatusCell";
import { useProcessingPhases } from "@features/ProcessingPhase";
import { TableRow } from "../TableRow";
import {
  Button,
  CustomLink,
  OpenDirectoryButton,
  StaticStates,
} from "@shared/ui";
import clsx from "clsx";
import { useTypedParams } from "@shared/hooks";

export function ProcessingPhasePage() {
  const variant = useTypedParams("processingPhaseType");

  const {
    data: sorted,
    loading,
    error,
    refetch,
  } = useProcessingPhases(variant);

  const handleSync = () => {
    refetch();
  };

  return (
    <StaticStates
      isLoading={loading}
      isError={!!error}
      isEmpty={!sorted.length}
    >
      <Button onClick={handleSync}>Sync</Button>

      <div role="tablist" className="tabs tabs-box tabs-xl">
        <CustomLink
          to={`/processing-phase/latest`}
          className={clsx("tab flex-1", variant === "latest" && "tab-active")}
        >
          Latest
        </CustomLink>
        <CustomLink
          to={`/processing-phase/running`}
          className={clsx("tab flex-1", variant === "running" && "tab-active")}
        >
          Running
        </CustomLink>
      </div>

      <TableWrapper>
        <>
          {sorted.map((v) => {
            const d = derivePhaseStatus(v.phases, "DOWNLOAD");
            const s = derivePhaseStatus(v.phases, "SCREENSHOTS");
            const t = derivePhaseStatus(v.phases, "THUMBNAILS");
            const last = latestActivityIso(v.phases);

            return (
              <TableRow key={v.id}>
                <TitleCell
                  videoId={v.id.toString()}
                  title={v.title}
                  ytId={v.ytId}
                  channelTitle={v.channel.title}
                  channelYtId={v.channel.ytId}
                />
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
                <OpenDirectoryButton
                  collection={v.channel.ytId}
                  media={v.ytId}
                />
              </TableRow>
            );
          })}
        </>
      </TableWrapper>
    </StaticStates>
  );
}
