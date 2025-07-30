import { Injectable } from '@nestjs/common';
import { YouTubeDownloaderService } from 'src/core/external-services/youtube-downloader/youtube-downloader.service';
import { EventsService } from 'src/core/events/events.service';

type Params = {
  ytChannelId: string;
  ytVideoId: string;
};

@Injectable()
export class DownloadService {
  constructor(
    private readonly youtubeDownloaderService: YouTubeDownloaderService,
    private readonly eventsService: EventsService,
  ) {}

  async download(params: Params) {
    await this.youtubeDownloaderService.addToQueue(params);

    this.eventsService.sendEvent('download_start', params.ytVideoId);

    return new Promise(async (resolve) => {
      let queueData: { [key: string]: any };
      do {
        queueData = await this.youtubeDownloaderService.getDownloadQueue();

        if (!queueData[params.ytChannelId]) {
          this.eventsService.sendEvent('download_finish', params.ytVideoId);
          resolve('downloaded');
          break;
        }

        const firstItem = queueData[params.ytChannelId][0];
        const downloadProgress = firstItem.downloadProgress;

        this.eventsService.sendEvent(
          'download_progress',
          params.ytVideoId,
          downloadProgress,
        );

        await new Promise((res) => setTimeout(res, 2000));
      } while (true);
    });
  }
}
