import { Module } from '@nestjs/common';
import { YouTubeDownloaderService } from './youtube-downloader.service';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [YouTubeDownloaderService],
  exports: [YouTubeDownloaderService],
})
export class YouTubeDownloaderModule {}
