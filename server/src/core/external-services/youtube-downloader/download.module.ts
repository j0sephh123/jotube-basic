import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';
import { EventsModule } from 'src/core/events/events.module';
import { YouTubeDownloaderModule } from './youtube-downloader.module';

@Module({
  imports: [EventsModule, YouTubeDownloaderModule],
  providers: [DownloadService],
  exports: [DownloadService],
})
export class DownloadModule {}
