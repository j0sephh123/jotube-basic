import type { VideoWithPhases } from "./types";
import { isoMinutesAgo } from "@shared/utils";

export const MOCK_DATA: VideoWithPhases[] = [
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
        endedAt: null,
      },
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
