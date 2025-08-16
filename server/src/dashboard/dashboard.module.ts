import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardResolver } from './dashboard.resolver';
import { DatabaseModule } from '../core/database/database.module';
import { ChannelsModule } from '../channels/channels.module';
import { LoggingModule } from '../logging/logging.module';

@Module({
  imports: [DatabaseModule, ChannelsModule, LoggingModule],
  providers: [DashboardService, DashboardResolver],
  exports: [DashboardService],
})
export class DashboardModule {}
