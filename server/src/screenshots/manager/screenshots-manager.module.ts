import { Module } from '@nestjs/common';
import { ScreenshotsManagerService } from './screenshots-manager.service';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  providers: [ScreenshotsManagerService],
  exports: [ScreenshotsManagerService],
})
export class ScreenshotsManagerModule {}
