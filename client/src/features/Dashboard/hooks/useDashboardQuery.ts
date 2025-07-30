import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import nestFetcher from "@/shared/api/nestFetcher";
import { useParams } from "react-router-dom";

export type DashboardResponseData = {
  channels: Array<
    {
      id: number;
      createdAt: Date;
      title: string;
      ytId: string;
      src: string;
      lastSyncedAt: string | null;
    } & {
      saved?: number;
      thumbnails: number;
      defaults?: number;
      uploadsWithScreenshots?: number;
      screenshotsCount?: number;
      uploads?: {
        id: number;
        title: string;
        ytId: string;
        src: string;
        status: number;
        publishedAt: string;
        duration: number;
        amountOfSavedScreenshots: number;
      }[];
      screenshots: {
        ytVideoId: string;
        second: number;
      }[];
    }
  >;
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
      nestFetcher({
        method: "POST",
        url: "/dashboard",
        body: requestBodyWithViewType,
      }),
  });
}
