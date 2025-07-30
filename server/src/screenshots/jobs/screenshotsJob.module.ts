import { Module } from '@nestjs/common';
import { ScreenshotsJobService } from './screenshotsJob.service';
import { EventsModule } from 'src/core/events/events.module';
import { ScreenshotsManagerModule } from 'src/screenshots/manager/screenshots-manager.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [EventsModule, ScreenshotsManagerModule, FileModule],
  providers: [ScreenshotsJobService],
  exports: [ScreenshotsJobService],
})
export class ScreenshotsJobModule {}
