import { useGetProcessingPhasesQuery } from "@shared/api";
import { useMemo } from "react";
import { latestActivityIso } from "@shared/utils";
import type { VideoWithPhases } from "../types";

export function useProcessingPhases(variant: "latest" | "running") {
  const { data, loading, error, refetch } = useGetProcessingPhasesQuery({
    variables: { variant },
  });

  const processedData = useMemo(() => {
    if (!data?.processingPhases) return [];

    const videoMap = new Map<number, VideoWithPhases>();

    data.processingPhases.forEach((phase) => {
      const videoId = phase.uploadsVideo.id;

      if (!videoMap.has(videoId)) {
        videoMap.set(videoId, {
          id: videoId,
          ytId: phase.uploadsVideo.ytId,
          title: phase.uploadsVideo.title,
          channel: phase.uploadsVideo.channel,
          phases: [],
        });
      }

      videoMap.get(videoId)!.phases.push({
        id: phase.id,
        uploadsVideoId: phase.uploadsVideoId,
        phase: phase.phase,
        createdAt: phase.createdAt,
        endedAt: phase.endedAt,
        uploadsVideo: phase.uploadsVideo,
      });
    });

    const videos = Array.from(videoMap.values());

    return videos.sort((a, b) => {
      const la = latestActivityIso(a.phases);
      const lb = latestActivityIso(b.phases);
      if (!la && !lb) return 0;
      if (!la) return 1;
      if (!lb) return -1;
      return new Date(lb).getTime() - new Date(la).getTime();
    });
  }, [data]);

  return {
    data: processedData,
    loading,
    error,
    refetch,
  };
}
