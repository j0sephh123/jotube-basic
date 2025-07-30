import { Module } from '@nestjs/common';
import { ThumbnailsManagerService } from './thumbnails-manager.service';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  providers: [ThumbnailsManagerService],
  exports: [ThumbnailsManagerService],
})
export class ThumbnailsManagerModule {}
