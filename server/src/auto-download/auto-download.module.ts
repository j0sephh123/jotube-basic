import { Module } from '@nestjs/common';
import { AutoDownloadService } from './auto-download.service';
import { StatisticsModule } from '../statistics/statistics.module';
import { DatabaseModule } from 'src/core/database/database.module';
import { BullModule } from '@nestjs/bull';
import { queueNames } from 'src/shared/constants';
import { QueueService } from '../queue/queue.service';

@Module({
  imports: [
    StatisticsModule,
    DatabaseModule,
    BullModule.registerQueue({
      name: queueNames.download,
    }),
    BullModule.registerQueue({
      name: queueNames.video,
    }),
    BullModule.registerQueue({
      name: queueNames.storyboard,
    }),
    BullModule.registerQueue({
      name: queueNames.episode,
    }),
  ],
  providers: [AutoDownloadService, QueueService],
  exports: [AutoDownloadService],
})
export class AutoDownloadModule {}
