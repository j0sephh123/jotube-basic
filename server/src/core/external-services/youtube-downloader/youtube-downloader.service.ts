import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

type QueueItem = {
  latestScreenshot: null;
  progress: string | number;
  status: string;
  totalSeconds: number;
  ytChannelId: string;
  ytVideoId: string;
};

type DownloadQueueItem = {
  ytChannelId: string;
  ytVideoId: string;
  videoTitle: string;
  channelTitle: string;
  isDownloading: boolean;
  downloadProgress: string;
};

type DownloadQueueByChannel = Record<string, DownloadQueueItem[]>;

type AddToQueueRequest = {
  ytChannelId: string;
  ytVideoId: string;
};

@Injectable()
export class YouTubeDownloaderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getDownloadQueue() {
    const base = this.configService.get('DL_SERVICE_URL');

    const fetcherQueueService = {
      async get(url: string) {
        const response = await fetch(base + url);
        const data = await response.json();

        return data as QueueItem[];
      },
    };

    const result = await fetcherQueueService.get('/queue');

    const fromDb = await Promise.all(
      result.map(async (item) => {
        const uploadVideo = await this.prismaService.uploadsVideo.findUnique({
          where: {
            ytId: item.ytVideoId,
          },
          include: {
            channel: {
              select: {
                ytId: true,
                title: true,
              },
            },
          },
        });

        return uploadVideo;
      }),
    );

    const endResult = result.reduce<DownloadQueueByChannel>((acc, item) => {
      const dbItem = fromDb.find((db) => db.ytId === item.ytVideoId);

      const downloadItem: DownloadQueueItem = {
        ytChannelId: dbItem.channel.ytId,
        ytVideoId: item.ytVideoId,
        videoTitle: dbItem.title,
        channelTitle: dbItem.channel.title,
        isDownloading: item.status === 'downloading',
        downloadProgress: item.progress as string,
      };

      if (dbItem) {
        if (acc[dbItem.channel.ytId]) {
          acc[dbItem.channel.ytId].push(downloadItem);
        } else {
          acc[dbItem.channel.ytId] = [downloadItem];
        }
      }

      return acc;
    }, {});

    return endResult;
  }

  async addToQueue({ ytChannelId, ytVideoId }: AddToQueueRequest) {
    const base = this.configService.get('DL_SERVICE_URL');

    const response = await fetch(base + '/add-to-queue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ytChannelId, ytVideoId }),
    });

    if (!response.ok) {
      throw new Error('Failed to add to queue');
    }

    return await response.json();
  }
}
