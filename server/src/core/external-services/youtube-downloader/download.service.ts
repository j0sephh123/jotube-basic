import { Injectable } from '@nestjs/common';
import { YouTubeDownloaderService } from 'src/core/external-services/youtube-downloader/youtube-downloader.service';

type Params = {
  ytChannelId: string;
  ytVideoId: string;
};

@Injectable()
export class DownloadService {
  constructor(
    private readonly youtubeDownloaderService: YouTubeDownloaderService,
  ) {}

  async download(params: Params) {
    await this.youtubeDownloaderService.addToQueue(params);

    console.log('download_start', params.ytVideoId);

    return new Promise(async (resolve) => {
      let queueData: { [key: string]: any };
      do {
        queueData = await this.youtubeDownloaderService.getDownloadQueue();

        if (!queueData[params.ytChannelId]) {
          console.log('download_finish', params.ytVideoId);
          resolve('downloaded');
          break;
        }

        const firstItem = queueData[params.ytChannelId][0];
        const downloadProgress = firstItem.downloadProgress;

        console.log('download_progress', params.ytVideoId, downloadProgress);

        await new Promise((res) => setTimeout(res, 2000));
      } while (true);
    });
  }
}
