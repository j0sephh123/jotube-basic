export class VideoMetadataDto {
  title: string;
  ytVideoId: string;
  screenshots: number[];
}

export class ChannelMetadataDto {
  ytChannelId: string;
  channelTitle: string;
  videos: VideoMetadataDto[];
}

export class ImageNavigatorResponseDto {
  channels: ChannelMetadataDto[];
}
