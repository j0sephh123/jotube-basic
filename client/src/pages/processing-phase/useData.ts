import { latestActivityIso } from "@shared/utils";
import { useMemo, useState } from "react";
import { MOCK_DATA } from "./mock-data";
import type { VideoWithPhases } from "./types";

export function useData() {
  const [rows] = useState<VideoWithPhases[]>(MOCK_DATA);

  return useMemo(() => {
    return [...rows].sort((a, b) => {
      const la = latestActivityIso(a.phases);
      const lb = latestActivityIso(b.phases);
      if (!la && !lb) return 0;
      if (!la) return 1;
      if (!lb) return -1;
      return new Date(lb).getTime() - new Date(la).getTime();
    });
  }, [rows]);
}
