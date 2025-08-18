import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';
import { YouTubeDownloaderModule } from './youtube-downloader.module';

@Module({
  imports: [YouTubeDownloaderModule],
  providers: [DownloadService],
  exports: [DownloadService],
})
export class DownloadModule {}
