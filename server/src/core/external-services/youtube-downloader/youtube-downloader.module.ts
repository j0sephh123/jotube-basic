import { Module } from '@nestjs/common';
import { YouTubeDownloaderService } from './youtube-downloader.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Module({
  providers: [YouTubeDownloaderService, PrismaService],
  exports: [YouTubeDownloaderService],
})
export class YouTubeDownloaderModule {}
