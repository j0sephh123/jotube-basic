import { useParams } from "react-router-dom";

export enum ViewType {
  SAVED = "saved",
  PROCESSED = "processed",
  NO_UPLOADS = "no-uploads",
  NO_SCREENSHOTS = "no-screenshots",
  THUMBNAILS = "thumbnails",
  HAS_STORYBOARDS = "has-storyboards",
}

export enum DashboardType {
  CHANNELS = "channels",
  VIDEOS = "videos",
}

export const useTypedChannelYtId = () => {
  const params = useParams<{ ytChannelId: string }>();
  const ytChannelId = params.ytChannelId as string;

  return ytChannelId;
};

export const useDashboardParams = () => {
  const params = useParams<{ type: DashboardType; viewType: ViewType }>();
  const type = params.type as DashboardType;
  const viewType = params.viewType as ViewType;

  return { type, viewType };
};
