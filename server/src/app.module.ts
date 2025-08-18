/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { YoutubeService } from './core/external-services/youtube-api/youtube.service';
import { ChannelsModule } from './channels/channels.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ScreenshotsJobModule } from './screenshots/jobs/screenshotsJob.module';
import { BullModule } from '@nestjs/bull';
import { DashboardModule } from './dashboard/dashboard.module';
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
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScreenshotsManagerModule } from './screenshots/manager/screenshots-manager.module';
import { ScreenshotsManagerService } from './screenshots/manager/screenshots-manager.service';
import { ThumbnailsManagerModule } from './thumbnails/manager/thumbnails-manager.module';
import { ScreenshotsApiModule } from './screenshots/api/screenshots-api.module';
import { FileModule } from './file/file.module';
import { StoryboardModule } from './storyboard/storyboard.module';
import { UploadsVideoModule } from './uploads-video/uploads-video.module';
import { DatabaseModule } from './core/database/database.module';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import * as path from 'path';
import { LoggingModule } from './logging/logging.module';
import { ArtifactsAggregatorModule } from './artifacts-aggregator/artifacts-aggregator.module';
import { PlaylistModule } from './playlist/playlist.module';
import { StatisticsModule } from './statistics/statistics.module';
import { AppGraphQLModule } from './graphql/graphql.module';

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
        timestamp: false,
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
    ThumbnailsModule,
    ScreenshotsJobModule,
    ScreenshotsManagerModule,
    ThumbnailsManagerModule,
    ScreenshotsApiModule,
    ChannelsModule,
    StoryboardModule,
    UploadsVideoModule,
    DatabaseModule,
    ArtifactsAggregatorModule,
    PlaylistModule,
    StatisticsModule,
    FileModule,
    DashboardModule,
    AppGraphQLModule,
  ],
  controllers: [QueueController, SearchController, StatisticsController],
  providers: [
    YoutubeService,
    QueueService,
    DownloadService,
    YouTubeDownloaderService,
    VideoProcessor,
    DownloadProcessor,
    StoryboardProcessor,
    ScreenshotsManagerService,
  ],
})
export class AppModule {}
