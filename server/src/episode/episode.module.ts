import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EpisodeService } from './episode.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { EpisodeResolver } from './episode.resolver';
import { FileModule } from 'src/file/file.module';
import { ThumbnailsManagerModule } from 'src/thumbnails/manager/thumbnails-manager.module';
import { ScreenshotsManagerModule } from 'src/screenshots/manager/screenshots-manager.module';
@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    FileModule,
    ThumbnailsManagerModule,
    ScreenshotsManagerModule,
  ],
  controllers: [],
  providers: [EpisodeService, EpisodeResolver],
  exports: [EpisodeService],
})
export class EpisodeModule {}
