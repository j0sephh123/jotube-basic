import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import nestFetcher from "@/shared/api/nestFetcher";
import { useParams } from "react-router-dom";
import { DashboardChannel } from "../types";

type Upload = {
  id: number;
  title: string;
  ytId: string;
  src: string;
  status: number;
  publishedAt: string;
  duration: number;
  amountOfSavedScreenshots: number;
};

type Screenshot = {
  ytVideoId: string;
  second: number;
};

type Item = DashboardChannel & {
  lastSyncedAt: string | null;
  saved?: number;
  thumbnails: number;
  defaults?: number;
  uploadsWithScreenshots?: number;
  screenshotsCount?: number;
  uploads?: Upload[];
  screenshots: Screenshot[];
};

export type DashboardResponseData = {
  channels: Item[];
  total: number;
};

export function useDashboardQuery() {
  const { requestBody } = useStore();
  const params = useParams();

  const requestBodyWithViewType = {
    ...requestBody,
    viewType: params.viewType,
  };

  return useQuery<DashboardResponseData>({
    queryKey: ["dashboard", requestBodyWithViewType],
    queryFn: () =>
      nestFetcher<DashboardResponseData>({
        method: "POST",
        url: "/dashboard",
        body: requestBodyWithViewType,
      }),
  });
}
