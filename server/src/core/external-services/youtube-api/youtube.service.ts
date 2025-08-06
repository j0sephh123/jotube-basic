import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface YouTubeApiResponse<T> {
  kind: string;
  etag: string;
  items: T[];
  nextPageToken?: string;
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface PlaylistItem {
  kind: 'youtube#playlistItem';
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: 'youtube#video';
      videoId: string;
    };
  };
}

interface VideoItem {
  kind: 'youtube#video';
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
  };
  contentDetails: {
    duration: string;
    dimension: {
      width: string;
      height: string;
    };
    definition: string;
    caption: string;
    licensedContent: boolean;
    contentRating: Record<string, unknown>;
    projection: string;
  };
}

interface ChannelItem {
  kind: 'youtube#channel';
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
    country: string;
  };
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
}

interface MappedUpload {
  src: string;
  publishedAt: string;
  ytId: string;
  title: string;
  channelId: number;
}

interface ChannelInfo {
  ytId: string;
  title: string;
  src: string;
  videoCount: number;
}

const fetcher = {
  async get<T>(url: string, params?: Record<string, string>): Promise<T> {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    const response = await fetch(url + queryString);
    const data = await response.json();

    return data;
  },
};

const ytBaseUrl = 'https://www.googleapis.com/youtube/v3';

const map =
  (channelId: number) =>
  (item: PlaylistItem): MappedUpload => ({
    src: item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
    ytId: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    channelId,
  });

@Injectable()
export class YoutubeService {
  constructor(private configService: ConfigService) {}

  private key = (): string => this.configService.get('YOUTUBE_API_KEY');

  async fetchUploadsForChannel(
    ytChannelId: string,
    channelId: number,
  ): Promise<MappedUpload[]> {
    const playlistId = `${ytChannelId[0]}U${ytChannelId.slice(2)}`;
    let pageToken: string | null = null;
    const allItems: PlaylistItem[] = [];

    try {
      do {
        const url = `${ytBaseUrl}/playlistItems`;
        const params: Record<string, string> = {
          part: 'snippet',
          maxResults: '50',
          playlistId: playlistId,
          key: this.key(),
          ...(pageToken ? { pageToken } : {}),
        };

        console.log(
          `Fetching playlist items with params: ${JSON.stringify(params)}`,
        );
        const data: YouTubeApiResponse<PlaylistItem> = await fetcher.get(
          url,
          params,
        );

        allItems.push(...data.items);

        pageToken = data.nextPageToken || null;

        if (pageToken) {
          await this.delay(1000);
        }
      } while (pageToken);
    } catch (error) {
      console.error(
        `Error fetching playlist items: ${(error as Error).message}`,
      );
      throw error;
    }

    const videoIds = allItems.map((item) => item.snippet.resourceId.videoId);

    const batchSize = 50;
    const filteredVideoIds: Set<string> = new Set();
    const nonShorts: VideoItem[] = [];

    try {
      for (let i = 0; i < videoIds.length; i += batchSize) {
        const batchIds = videoIds.slice(i, i + batchSize).join(',');

        const videosUrl = `${ytBaseUrl}/videos`;
        const videosParams: Record<string, string> = {
          part: 'contentDetails,snippet',
          id: batchIds,
          key: this.key(),
          maxResults: '50',
        };

        console.log(`Fetching video details for IDs: ${batchIds}`);
        const videosData: YouTubeApiResponse<VideoItem> = await fetcher.get(
          videosUrl,
          videosParams,
        );

        videosData.items.forEach((video) => {
          const durationInSeconds = iso8601ToSeconds(
            video.contentDetails.duration,
          );

          const isLongEnough = durationInSeconds >= 180;

          if (isLongEnough) {
            filteredVideoIds.add(video.id);
            nonShorts.push(video);
          }
        });

        await this.delay(1000);
      }
    } catch (error) {
      console.error(
        `Error fetching video details: ${(error as Error).message}`,
      );
      throw error;
    }

    const filteredItems = allItems.filter((item) =>
      filteredVideoIds.has(item.snippet.resourceId.videoId),
    );

    console.log(`Total non-Short videos found: ${filteredItems.length}`);

    return filteredItems.map(map(channelId));
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async syncUploads(
    ytChannelId: string,
    ytVideoId: string,
    channelId: number,
  ): Promise<MappedUpload[]> {
    const uploads: MappedUpload[] = [];
    let nextPageToken: string | null = null;
    let foundVideo = false;

    do {
      const url = `${ytBaseUrl}/playlistItems?part=snippet&maxResults=50&playlistId=UU${ytChannelId.substring(2)}&key=${this.key()}${
        nextPageToken ? `&pageToken=${nextPageToken}` : ''
      }`;

      const response: YouTubeApiResponse<PlaylistItem> = await fetcher.get(url);

      const { items, nextPageToken: newPageToken } = response;

      for (const item of items) {
        const videoId = item.snippet.resourceId.videoId;

        if (videoId === ytVideoId) {
          foundVideo = true;
          break;
        }

        uploads.push({
          title: item.snippet.title,
          src: item.snippet.thumbnails?.high?.url || '',
          publishedAt: item.snippet.publishedAt,
          ytId: videoId,
          channelId,
        });
      }

      nextPageToken = newPageToken;
    } while (nextPageToken && !foundVideo);

    if (uploads.length === 0) {
      return uploads;
    }

    const videoIds = uploads.map((upload) => upload.ytId);
    const batchSize = 50;
    const filteredVideoIds: Set<string> = new Set();

    for (let i = 0; i < videoIds.length; i += batchSize) {
      const batchIds = videoIds.slice(i, i + batchSize).join(',');

      const videosUrl = `${ytBaseUrl}/videos`;
      const videosParams: Record<string, string> = {
        part: 'contentDetails,snippet',
        id: batchIds,
        key: this.key(),
        maxResults: '50',
      };

      const videosData: YouTubeApiResponse<VideoItem> = await fetcher.get(
        videosUrl,
        videosParams,
      );

      videosData.items.forEach((video) => {
        const durationInSeconds = iso8601ToSeconds(
          video.contentDetails.duration,
        );

        const isLongEnough = durationInSeconds >= 180;

        if (isLongEnough) {
          filteredVideoIds.add(video.id);
        }
      });

      await this.delay(1000);
    }

    const filteredUploads = uploads.filter((upload) =>
      filteredVideoIds.has(upload.ytId),
    );

    return filteredUploads;
  }

  async getChannelIdByVideoId(videoId: string): Promise<string> {
    const url = `${ytBaseUrl}/videos?part=snippet&id=${videoId}&key=${this.key()}`;
    const data: YouTubeApiResponse<VideoItem> = await fetcher.get(url);

    const channelId = data.items[0].snippet.channelId;
    return channelId;
  }

  async getLatestUploadId(channelId: string): Promise<string> {
    const playlistId = `${channelId[0]}U${channelId.slice(2)}`;
    const url = `${ytBaseUrl}/playlistItems?part=snippet&maxResults=1&playlistId=${playlistId}&key=${this.key()}`;
    const data: YouTubeApiResponse<PlaylistItem> = await fetcher.get(url);
    const latestUploadId = data.items[0].snippet.resourceId.videoId;
    return latestUploadId;
  }

  async getChannel(channelId: string): Promise<ChannelInfo> {
    const url = `${ytBaseUrl}/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${this.key()}`;
    const data: YouTubeApiResponse<ChannelItem> = await fetcher.get(url);
    const item = data.items[0];

    return {
      ytId: item.id,
      title: item.snippet.title,
      src: item.snippet.thumbnails.high.url,
      videoCount: +item.statistics.videoCount,
    };
  }
}

function iso8601ToSeconds(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds;
}
