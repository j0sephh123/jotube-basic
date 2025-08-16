import { Module } from '@nestjs/common';
import { ThumbnailsService } from './thumbnails.service';
import { ThumbnailsApiService } from './api/thumbnails-api.service';
import { ThumbnailsResolver } from './thumbnails.resolver';
import { ThumbnailsManagerModule } from './manager/thumbnails-manager.module';
import { EventsModule } from 'src/core/events/events.module';
import { FileModule } from 'src/file/file.module';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [FileModule, EventsModule, DatabaseModule, ThumbnailsManagerModule],
  providers: [ThumbnailsService, ThumbnailsApiService, ThumbnailsResolver],
  exports: [ThumbnailsService],
})
export class ThumbnailsModule {}
