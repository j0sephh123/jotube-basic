import { Module } from '@nestjs/common';
import { ThumbnailsService } from './thumbnails.service';
import { EventsModule } from 'src/core/events/events.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule, EventsModule],
  providers: [ThumbnailsService],
  exports: [ThumbnailsService],
})
export class ThumbnailsModule {}
