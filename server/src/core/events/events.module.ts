import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { EventsGateway } from '../../events.gateway';

@Module({
  providers: [EventsService, PrismaService, EventsGateway],
  exports: [EventsService],
})
export class EventsModule {}
