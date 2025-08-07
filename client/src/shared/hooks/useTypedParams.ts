import { useParams } from "react-router-dom";

export enum ViewType {
  SAVED = "saved",
  PROCESSED = "processed",
  NO_UPLOADS = "no-uploads",
  NO_SCREENSHOTS = "no-screenshots",
  THUMBNAILS = "thumbnails",
  HAS_STORYBOARDS = "has-storyboard", // not used yet
}

export const useTypedChannelYtId = () => {
  const params = useParams<{ ytChannelId: string }>();
  const ytChannelId = params.ytChannelId as string;

  return ytChannelId;
};

export const useTypedViewType = () => {
  const params = useParams<{ viewType: string }>();
  const viewType = params.viewType as ViewType;

  return viewType;
};
