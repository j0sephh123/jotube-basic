/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { DownloadProcessor } from './video-worker/download.processor';
import { StoryboardProcessor } from './video-worker/storyboard.processor';
import { QueueController } from './queue/queue.controller';
import { SearchController } from './search/search.controller';
import { StatisticsController } from './statistics/statistics.controller';
import { QueueService } from './queue/queue.service';
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
import { EventsGateway } from './events.gateway';
import { StoryboardModule } from './storyboard/storyboard.module';
import { UploadsVideoModule } from './uploads-video/uploads-video.module';
import { DatabaseModule } from './core/database/database.module';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import * as path from 'path';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        autoLogging: false, // don’t auto-log every request
        stream: pino.destination(path.join(process.cwd(), 'logs', 'app.log')),
        // Remove unwanted keys from request logs
        serializers: {
          req: () => undefined, // drop req object entirely
          res: () => undefined, // drop res
        },
        formatters: {
          // Make level human-readable
          level(label) {
            return { level: label };
          },
          // Remove pid and hostname completely
          bindings() {
            return {};
          },
        },
      },
    }),
    EventEmitterModule.forRoot(),
    BullModule.registerQueue({
      name: queueNames.video,
    }),
    BullModule.registerQueue({
      name: queueNames.download,
    }),
    BullModule.registerQueue({
      name: queueNames.storyboard,
    }),
    LoggingModule,
    ImagesModule,
    NestConfigModule.forRoot(),
    EventsModule,
    ThumbnailsModule,
    ScreenshotsJobModule,
    ScreenshotsManagerModule,
    ThumbnailsManagerModule,
    ScreenshotsApiModule,
    ThumbnailsApiModule,
    ChannelsModule,
    StoryboardModule,
    UploadsVideoModule,
    DatabaseModule,
  ],
  controllers: [
    QueueController,
    OpenDirectoryController,
    SearchController,
    StatisticsController,
    DashboardController,
  ],
  providers: [
    YoutubeService,
    DashboardService,
    QueueService,
    DownloadService,
    YouTubeDownloaderService,
    VideoProcessor,
    DownloadProcessor,
    StoryboardProcessor,
    FilePathService,
    DirectoryService,
    FileOperationService,
    ScreenshotsManagerService,
    EventsGateway,
  ],
})
export class AppModule {}
