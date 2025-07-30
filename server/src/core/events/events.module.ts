import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { SseModule } from 'src/shared/sse/sse.module';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Module({
  providers: [EventsService, PrismaService],
  exports: [EventsService],
  imports: [SseModule],
})
export class EventsModule {}
