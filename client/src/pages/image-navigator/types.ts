interface ImageNavigatorMetadata {
  ytVideoId: string;
  ytChannelId: string;
  channelTitle: string;
  videoTitle: string;
}

export interface ImageNavigatorResponse {
  screenshots: number[];
  metadata: ImageNavigatorMetadata;
}

export type ImageNavigatorType = "all" | "video" | "channel";

export interface ImageNavigatorRequest {
  type: ImageNavigatorType;
  ytVideoId?: string;
  ytChannelId?: string;
}
