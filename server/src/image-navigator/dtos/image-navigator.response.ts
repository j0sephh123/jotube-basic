export class ImageNavigatorResponseDto {
  screenshots: number[];
  metadata: {
    ytVideoId: string;
    ytChannelId: string;
    channelTitle: string;
    videoTitle: string;
  };
}
