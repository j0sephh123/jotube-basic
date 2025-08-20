interface VideoMetadata {
  title: string;
  ytVideoId: string;
  screenshots: number[];
}

interface ChannelMetadata {
  ytChannelId: string;
  channelTitle: string;
  videos: VideoMetadata[];
}

export interface ImageNavigatorResponse {
  channels: ChannelMetadata[];
}

export type ImageNavigatorType = "all" | "video" | "channel";

export interface ImageNavigatorRequest {
  type: ImageNavigatorType;
  ytVideoId?: string;
  ytChannelId?: string;
  skipChannels?: string[];
}
