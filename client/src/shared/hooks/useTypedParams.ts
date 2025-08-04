import { useParams } from "react-router-dom";

export enum ViewType {
  SAVED = "Saved",
  PROCESSED = "Processed",
  CHANNELS_WITHOUT_UPLOADS = "No uploads",
  CHANNELS_WITHOUT_SCREENSHOTS = "No screenshots",
  THUMBNAILS = "Thumbnails",
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
