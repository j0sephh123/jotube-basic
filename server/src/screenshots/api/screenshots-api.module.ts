import { Module } from '@nestjs/common';
import { ScreenshotsApiController } from './screenshots-api.controller';
import { ScreenshotsApiService } from './screenshots-api.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { FileModule } from 'src/file/file.module';
import { ScreenshotsManagerModule } from 'src/screenshots/manager/screenshots-manager.module';

@Module({
  imports: [ScreenshotsManagerModule, FileModule],
  controllers: [ScreenshotsApiController],
  providers: [ScreenshotsApiService, PrismaService],
})
export class ScreenshotsApiModule {}
