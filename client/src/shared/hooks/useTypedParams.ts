import { useParams } from 'react-router-dom';

export enum ViewType {
  SAVED = "saved",
  PROCESSED = "processed",
  CHANNELS_WITHOUT_UPLOADS = "channels-without-uploads",
  CHANNELS_WITHOUT_SCREENSHOTS = "channels-without-screenshots",
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