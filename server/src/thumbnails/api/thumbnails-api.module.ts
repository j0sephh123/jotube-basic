import { Module } from '@nestjs/common';
import { ThumbnailsApiService } from './thumbnails-api.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ThumbnailsModule } from 'src/thumbnails/thumbnails.module';
import { ThumbnailsManagerModule } from 'src/thumbnails/manager/thumbnails-manager.module';
import { ThumbnailsApiController } from '../thumbnails.controller';

@Module({
  imports: [ThumbnailsModule, ThumbnailsManagerModule],
  controllers: [ThumbnailsApiController],
  providers: [ThumbnailsApiService, PrismaService],
  exports: [ThumbnailsApiService],
})
export class ThumbnailsApiModule {}
