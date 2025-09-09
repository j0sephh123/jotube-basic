import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueResolver } from './queue.resolver';
import { DatabaseModule } from 'src/core/database/database.module';
import { BullModule } from '@nestjs/bull';
import { queueNames } from 'src/shared/constants';

@Module({
  imports: [
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
  providers: [QueueService, QueueResolver],
  exports: [QueueService],
})
export class QueueModule {}
