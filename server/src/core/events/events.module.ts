import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { EventsGateway } from '../../events.gateway';

@Module({
  imports: [DatabaseModule],
  providers: [EventsService, EventsGateway],
  exports: [EventsService],
})
export class EventsModule {}
