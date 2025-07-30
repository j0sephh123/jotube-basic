import { Module } from '@nestjs/common';
import { YoutubeService } from './core/external-services/youtube-api/youtube.service';
import { ChannelsModule } from './channels/channels.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ScreenshotsJobModule } from './screenshots/jobs/screenshotsJob.module';
import { BullModule } from '@nestjs/bull';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { ThumbnailsModule } from './thumbnails/thumbnails.module';
import { queueNames } from 'src/shared/constants';
import { DownloadService } from './core/external-services/youtube-downloader/download.service';
import { YouTubeDownloaderService } from './core/external-services/youtube-downloader/youtube-downloader.service';
import { VideoProcessor } from './video-worker/video.processor';
import { SseModule } from './shared/sse/sse.module';
import { PrismaService } from './core/database/prisma/prisma.service';
import { QueueController } from './queue/queue.controller';
import { UploadsVideoController } from './uploads-video/uploads-video.controller';
import { SearchController } from './search/search.controller';
import { StatisticsController } from './statistics/statistics.controller';
import { QueueService } from './queue/queue.service';
import { UploadsVideoService } from './uploads-video/uploads-video.service';
import { FilePathService } from './file/file-path.service';
import { DirectoryService } from './file/directory.service';
import { FileOperationService } from './file/file-operation.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './core/events/events.module';
import { ScreenshotsManagerModule } from './screenshots/manager/screenshots-manager.module';
import { ScreenshotsManagerService } from './screenshots/manager/screenshots-manager.service';
import { ThumbnailsManagerModule } from './thumbnails/manager/thumbnails-manager.module';
import { ScreenshotsApiModule } from './screenshots/api/screenshots-api.module';
import { ThumbnailsApiModule } from './thumbnails/api/thumbnails-api.module';
import { OpenDirectoryController } from './file/open-directory.controller';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    BullModule.registerQueue({
      name: queueNames.video,
    }),
    ImagesModule,
    NestConfigModule.forRoot(),
    EventsModule,
    SseModule,
    ThumbnailsModule,
    ScreenshotsJobModule,
    ScreenshotsManagerModule,
    ThumbnailsManagerModule,
    ScreenshotsApiModule,
    ThumbnailsApiModule,
    ChannelsModule,
  ],
  controllers: [
    QueueController,
    OpenDirectoryController,
    UploadsVideoController,
    SearchController,
    StatisticsController,
    DashboardController,
  ],
  providers: [
    PrismaService,
    YoutubeService,
    UploadsVideoService,
    DashboardService,
    QueueService,
    DownloadService,
    YouTubeDownloaderService,
    VideoProcessor,
    FilePathService,
    DirectoryService,
    FileOperationService,
    ScreenshotsManagerService,
  ],
})
export class AppModule {}
