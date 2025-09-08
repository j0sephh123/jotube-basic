import { Module } from '@nestjs/common';
import { ScreenshotsApiController } from './screenshots-api.controller';
import { ScreenshotsApiService } from './screenshots-api.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { FileModule } from 'src/file/file.module';
import { ScreenshotsManagerModule } from 'src/screenshots/manager/screenshots-manager.module';
import { ScreenshotsResolver } from '../screenshots.resolver';

@Module({
  imports: [ScreenshotsManagerModule, FileModule, DatabaseModule],
  controllers: [ScreenshotsApiController],
  providers: [ScreenshotsApiService, ScreenshotsResolver],
})
export class ScreenshotsApiModule {}
