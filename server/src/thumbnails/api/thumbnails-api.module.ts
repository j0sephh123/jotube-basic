import { Module } from '@nestjs/common';
import { ThumbnailsApiService } from './thumbnails-api.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { ThumbnailsModule } from 'src/thumbnails/thumbnails.module';
import { ThumbnailsManagerModule } from 'src/thumbnails/manager/thumbnails-manager.module';
import { ThumbnailsApiController } from '../thumbnails.controller';

@Module({
  imports: [ThumbnailsModule, ThumbnailsManagerModule, DatabaseModule],
  controllers: [ThumbnailsApiController],
  providers: [ThumbnailsApiService],
  exports: [ThumbnailsApiService],
})
export class ThumbnailsApiModule {}
