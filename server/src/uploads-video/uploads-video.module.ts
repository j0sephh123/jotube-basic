import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadsVideoController } from './uploads-video.controller';
import { UploadsVideoService } from './uploads-video.service';
import { UploadsVideoResolver } from './uploads-video.resolver';
import { StoryboardModule } from '../storyboard/storyboard.module';
import { DatabaseModule } from '../core/database/database.module';
import { DirectoryService } from '../file/directory.service';
import { ThumbnailsManagerModule } from '../thumbnails/manager/thumbnails-manager.module';
import { ScreenshotsManagerModule } from '../screenshots/manager/screenshots-manager.module';
import { FilePathService } from '../file/file-path.service';
import { FileOperationService } from '../file/file-operation.service';
import { YoutubeService } from '../core/external-services/youtube-api/youtube.service';

@Module({
  imports: [
    ConfigModule,
    StoryboardModule,
    ThumbnailsManagerModule,
    ScreenshotsManagerModule,
    DatabaseModule,
  ],
  controllers: [UploadsVideoController],
  providers: [
    UploadsVideoService,
    DirectoryService,
    FilePathService,
    FileOperationService,
    YoutubeService,
    UploadsVideoResolver,
  ],
  exports: [UploadsVideoService],
})
export class UploadsVideoModule {}
